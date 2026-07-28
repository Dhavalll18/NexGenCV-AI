# 🚀 NexGenCV AI — Resume Intelligence Platform

An intelligent, privacy-first ATS resume scanner and technical skill gap analyzer. Built with **Next.js 14**, **FastAPI**, and **Python**.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## 📌 Overview

**NexGenCV AI** helps job seekers, developers, and students optimize their resumes for Applicant Tracking Systems (ATS). 

Instead of simple string keyword matching, NexGenCV AI analyzes document structure, categorizes technical skills into multi-level matrices, classifies target career domains across 25+ fields, evaluates quantifiable impact, and produces a weighted ATS score along with actionable recommendations and a downloadable 2-page PDF summary report.

### Key Highlights
- **100% In-Memory Processing**: Resumes are parsed in memory and never stored on persistent storage or shared with third parties.
- **Smart OCR Fallback**: Automatically invokes PyTesseract OCR if a PDF is image-heavy or scanned.
- **Multi-Category Skill Extraction**: Groups skills into Languages, Frameworks, Tools, Databases, and Soft Skills while identifying missing high-demand skills.
- **Executive PDF Intelligence Report**: One-click download of a structured 2-page analysis report generated with ReportLab.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom Dark Mode & Glassmorphism Design System)
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Document Parsers**: `PyMuPDF` (`fitz`), `pypdf`, `python-docx`
- **OCR Engine**: `pytesseract` + `pdf2image`
- **PDF Generator**: `ReportLab`
- **Schema Validation**: Pydantic v2

---

## ⚡ Features

1. **Intelligent Document Parsing**: Supports `.pdf` and `.docx` formats up to 5MB.
2. **ATS Compatibility Score (0–100)**: Calculated using a 6-vector weighted algorithm:
   - Keyword Match Density (20%)
   - Section Completeness (20%)
   - Skill Matrix & Gap Coverage (20%)
   - Formatting & Structure Integrity (15%)
   - Experience & Action Verbs (15%)
   - Project Portfolio Impact (10%)
3. **Domain Classification**: Identifies primary and secondary target fields (Software / IT, Data Science, DevOps, Full-Stack, etc.).
4. **Compliance & Issue Detection**: Highlights formatting pitfalls like tables, images, missing email/phone, or generic job descriptions.
5. **PDF Report Export**: Downloads a clean, 2-page executive summary PDF formatted for easy reading.

---

## 📁 Project Structure

```
NexGenCV AI/
├── backend/
│   ├── app/
│   │   ├── main.py                   # FastAPI application & REST endpoints
│   │   ├── models/
│   │   │   └── schemas.py            # Pydantic data models & request/response schemas
│   │   └── services/
│   │       ├── resume_parser.py      # PDF & DOCX text extraction
│   │       ├── skill_extractor.py    # Skill taxonomy matrix & gap analyzer
│   │       ├── domain_classifier.py  # Domain heuristic & keyword classifier
│   │       ├── ats_scorer.py         # ATS scoring logic & issue generation
│   │       ├── ocr_service.py        # PyTesseract fallback OCR service
│   │       └── report_generator.py   # ReportLab PDF report generation
│   ├── render.yaml                   # Production deployment config (Render)
│   └── requirements.txt              # Python package dependencies
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css           # Custom dark theme tokens & glassmorphism
│   │   │   ├── layout.tsx            # Next.js root layout & SEO tags
│   │   │   └── page.tsx              # Main dashboard view
│   │   ├── components/
│   │   │   ├── Header.tsx            # Header with NexGenCV AI branding logo
│   │   │   ├── Logo.tsx              # Neural circuit vector logo component
│   │   │   ├── Hero.tsx              # Landing page hero section
│   │   │   ├── UploadSection.tsx     # File intake dropzone
│   │   │   ├── ResultsDashboard.tsx  # Analysis dashboard container
│   │   │   ├── Footer.tsx            # Dark theme footer
│   │   │   └── results/              # Dashboard metrics & breakdown cards
│   │   ├── services/
│   │   │   └── api.ts                # API client helper functions
│   │   └── types/
│   │       └── index.ts              # TypeScript interfaces
│   ├── package.json
│   ├── tailwind.config.js
│   └── next.config.js
│
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ and `npm`
- **Python**: v3.10+ and `pip`

---

### 1. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv .venv

# Activate virtual environment
# Windows (PowerShell):
.venv\Scripts\Activate.ps1
# macOS / Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```
The FastAPI backend server will start at `http://localhost:8000`.

---

### 2. Setup Frontend

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start Next.js development server
npm run dev
```
Open `http://localhost:3000` in your browser to launch **NexGenCV AI**.

---

## 📡 API Reference

### 1. Analyze Resume
`POST /api/analyze`

**Request**: `multipart/form-data`
- `file`: Resume file (`.pdf` or `.docx`, max 5MB)

**Response Payload Example**:
```json
{
  "ats_score": 87,
  "category": "Excellent",
  "candidate": {
    "name": "Alex Mercer",
    "email": "alex.mercer@example.com",
    "phone": "+1-555-019-2831",
    "location": "San Francisco, CA",
    "linkedin": "linkedin.com/in/alexmercer",
    "github": "github.com/alexmercer"
  },
  "domain": {
    "primary": "Software / IT",
    "confidence": 0.85
  },
  "skills": {
    "total_count": 14,
    "programming_languages": ["Python", "TypeScript", "SQL"],
    "frameworks": ["React", "Express.js", "FastAPI", "Tailwind CSS"],
    "tools": ["Git", "Docker", "Postman"],
    "databases": ["PostgreSQL", "MongoDB"]
  },
  "score_breakdown": {
    "keyword_relevance": 85,
    "section_completeness": 90,
    "formatting_score": 95,
    "skill_relevance": 90,
    "experience_clarity": 80,
    "project_impact": 85
  }
}
```

### 2. Download Report
`POST /api/download-report`

**Request**: JSON body matching the analysis response structure.  
**Response**: Binary stream (`application/pdf`) triggering an instant browser download of the PDF report.

---

## 📊 ATS Scoring Breakdown

| Metric Vector | Weight | Description |
| :--- | :---: | :--- |
| **Keyword Match** | **20%** | Density of relevant industry keywords and tech terms. |
| **Section Completeness** | **20%** | Presence of standard sections (Experience, Education, Skills, Projects). |
| **Skill Coverage** | **20%** | Multi-category technical skill count and depth. |
| **Formatting Integrity** | **15%** | Standard text layout, bullet format, and absence of complex tables/graphics. |
| **Experience Clarity** | **15%** | Action verb usage, role titles, and quantifiable metrics (% or numbers). |
| **Project Impact** | **10%** | Clear tech stack attribution and project outcome descriptions. |

---

## 🛡️ Privacy & Security

- **Zero Storage**: Files are processed exclusively in RAM during the lifecycle of the HTTP request.
- **Auto Cleanup**: Temporary processing buffers are immediately released upon completion.
- **No Third-Party AI Data Sharing**: All NLP, skill taxonomy matching, and scoring algorithms run locally within the application server.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
