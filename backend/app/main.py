"""
NexGenCV AI - FastAPI Engine Entry Point
AI Powered Resume Intelligence Platform Backend API
"""
from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
import os
import tempfile
from typing import Optional

from app.services.resume_parser import ResumeParser
from app.services.ats_scorer import ATSScorer
from app.services.skill_extractor import SkillExtractor
from app.services.domain_classifier import DomainClassifier
from app.services.report_generator import ReportGenerator
from app.models.schemas import AnalysisResponse

app = FastAPI(
    title="NexGenCV AI API",
    description="AI Powered Resume Intelligence Platform Engine",
    version="1.0.0"
)

# Production CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize core services
resume_parser = ResumeParser()
ats_scorer = ATSScorer()
skill_extractor = SkillExtractor()
domain_classifier = DomainClassifier()
report_generator = ReportGenerator()

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB Limit
ALLOWED_EXTENSIONS = {".pdf", ".docx"}


@app.get("/")
async def root():
    return {
        "platform": "NexGenCV AI",
        "version": "1.0.0",
        "status": "online"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "NexGenCV AI Engine"}


@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_resume(file: UploadFile = File(...)):
    """
    Analyze uploaded resume file (PDF/DOCX) and generate ATS score, skill matrix, and insights.
    """
    # 1. Validate file extension
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{file_ext}'. Allowed formats: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # 2. Read file content
    content = await file.read()
    
    # 3. Validate file size
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds the 5MB maximum limit."
        )
    
    tmp_path = None
    try:
        # Create temp file safely
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as tmp_file:
            tmp_file.write(content)
            tmp_path = tmp_file.name
        
        # 4. Parse resume text
        parsed_data = resume_parser.parse(tmp_path, file_ext)
        parsing_method = parsed_data.get("parsing_method", "standard")
        ocr_confidence = parsed_data.get("ocr_confidence")
        
        # 5. Extract skill matrix
        skills_data = skill_extractor.extract(parsed_data["raw_text"])
        
        # 6. Classify target job domain
        domain_data = domain_classifier.classify(parsed_data["raw_text"], skills_data)
        
        # 7. Calculate ATS compatibility score
        ats_analysis = ats_scorer.calculate_score(
            parsed_data, 
            skills_data, 
            domain_data,
            parsing_method=parsing_method,
            ocr_confidence=ocr_confidence
        )
        
        # Build response schema
        response = AnalysisResponse(
            success=True,
            candidate=parsed_data["candidate"],
            ats_score=ats_analysis["score"],
            score_breakdown=ats_analysis["breakdown"],
            score_category=ats_analysis["category"],
            domain=domain_data,
            skills=skills_data,
            projects=parsed_data["projects"],
            experience=parsed_data["experience"],
            education=parsed_data["education"],
            issues=ats_analysis["issues"],
            suggestions=ats_analysis["suggestions"],
            keywords_analysis=ats_analysis["keywords_analysis"],
            parsing_method=parsing_method,
            ocr_confidence=ocr_confidence
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")
    finally:
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.unlink(tmp_path)
            except Exception:
                pass


@app.post("/api/download-report")
async def download_report(request: Request):
    """
    Generate downloadable PDF report from analysis results.
    """
    try:
        analysis_data = await request.json()
        pdf_bytes = report_generator.generate_pdf(analysis_data)
        
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=NexGenCV-Analysis-Report.pdf"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
