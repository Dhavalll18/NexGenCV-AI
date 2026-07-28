"""
NexGenCV AI - PDF Report Generator Service
Generates dense, rich executive-grade PDF intelligence reports for resume analysis.
"""
from io import BytesIO
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas

class ReportGenerator:
    """Generate comprehensive 2-page PDF intelligence reports."""

    def __init__(self):
        self.width, self.height = A4
        self.margin = 36  # tight 0.5 inch margins for max density

    def generate_pdf(self, analysis_data: dict) -> bytes:
        buffer = BytesIO()
        c = canvas.Canvas(buffer, pagesize=A4)

        # Page 1: Executive Summary, Candidate Profile, Skills, Experience, Projects & Education
        y = self._draw_header(c, analysis_data)
        y = self._draw_top_summary(c, analysis_data, y)
        y = self._draw_skills_section(c, analysis_data, y)
        y = self._draw_experience_section(c, analysis_data, y)
        y = self._draw_projects_section(c, analysis_data, y)
        y = self._draw_education_section(c, analysis_data, y)
        self._draw_page_footer(c, 1)

        c.showPage()

        # Page 2: Compliance Warnings, Missing Keywords, & AI Action Plan
        y = self._draw_header(c, analysis_data, is_page2=True)
        y = self._draw_keywords_section(c, analysis_data, y)
        y = self._draw_issues_section(c, analysis_data, y)
        y = self._draw_suggestions_section(c, analysis_data, y)
        self._draw_page_footer(c, 2)

        c.save()
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes

    def _draw_header(self, c, data, is_page2=False):
        y = self.height - 35
        c.setFont("Helvetica-Bold", 18)
        c.setFillColor(HexColor('#050505'))
        title = "NexGenCV AI — Compliance & Intelligence Report" if is_page2 else "NexGenCV AI — Resume Intelligence Report"
        c.drawString(self.margin, y, title)

        c.setFont("Helvetica", 8)
        c.setFillColor(HexColor('#71717A'))
        date_str = datetime.now().strftime('%B %d, %Y at %I:%M %p')
        c.drawRightString(self.width - self.margin, y + 4, f"Generated: {date_str}")

        c.setStrokeColor(HexColor('#FF2D55'))
        c.setLineWidth(1.5)
        c.line(self.margin, y - 8, self.width - self.margin, y - 8)
        return y - 20

    def _draw_top_summary(self, c, data, y_start):
        score = data.get('ats_score', 0)
        category = data.get('score_category', 'Unknown')
        candidate = data.get('candidate', {})
        domain = data.get('domain', {})
        breakdown = data.get('score_breakdown', {})

        box_height = 85
        c.setStrokeColor(HexColor('#E4E4E7'))
        c.setFillColor(HexColor('#FAFAFA'))
        c.rect(self.margin, y_start - box_height, self.width - (2 * self.margin), box_height, fill=1, stroke=1)

        # ATS Score Badge Box
        score_color = HexColor('#10B981') if score >= 80 else HexColor('#F59E0B') if score >= 60 else HexColor('#FF2D55')
        c.setFillColor(score_color)
        c.rect(self.margin + 10, y_start - box_height + 10, 75, 65, fill=1, stroke=0)

        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 26)
        c.drawString(self.margin + 18, y_start - 35, str(score))
        c.setFont("Helvetica", 10)
        c.drawString(self.margin + 54, y_start - 35, "/100")

        c.setFont("Helvetica-Bold", 8)
        c.drawString(self.margin + 16, y_start - 58, category.upper())

        # Candidate Meta Info
        x_meta = self.margin + 98
        c.setFillColor(HexColor('#09090C'))
        c.setFont("Helvetica-Bold", 12)
        c.drawString(x_meta, y_start - 20, candidate.get('name') or "Candidate Resume")

        c.setFont("Helvetica", 8.5)
        c.setFillColor(HexColor('#52525B'))
        meta_lines = []
        if candidate.get('email'): meta_lines.append(f"Email: {candidate['email']}")
        if candidate.get('phone'): meta_lines.append(f"Phone: {candidate['phone']}")
        if candidate.get('location'): meta_lines.append(f"Location: {candidate['location']}")
        if candidate.get('github'): meta_lines.append(f"GitHub: {candidate['github']}")
        
        c.drawString(x_meta, y_start - 34, " | ".join(meta_lines[:2]))
        if len(meta_lines) > 2:
            c.drawString(x_meta, y_start - 46, " | ".join(meta_lines[2:]))

        c.setFont("Helvetica-Bold", 8.5)
        c.setFillColor(HexColor('#FF2D55'))
        c.drawString(x_meta, y_start - 62, f"Target Domain: {domain.get('primary', 'General Software')} (Confidence: {int(domain.get('confidence', 0)*100)}%)")

        # Compatibility Breakdown Matrix
        x_break = self.margin + 330
        c.setFillColor(HexColor('#09090C'))
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(x_break, y_start - 18, "Score Matrix:")

        c.setFont("Helvetica", 8)
        c.setFillColor(HexColor('#3F3F46'))
        items = [
            ('Skills', breakdown.get('skill_relevance', 0)),
            ('Experience', breakdown.get('experience_clarity', 0)),
            ('Projects', breakdown.get('project_impact', 0)),
            ('Formatting', breakdown.get('formatting_score', 0)),
            ('Completeness', breakdown.get('section_completeness', 0)),
        ]
        b_y = y_start - 30
        for label, val in items:
            c.drawString(x_break, b_y, f"• {label}: {val}/100")
            b_y -= 10

        return y_start - box_height - 15

    def _draw_skills_section(self, c, data, y_start):
        skills = data.get('skills', {})
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(HexColor('#050505'))
        c.drawString(self.margin, y_start, "Detected Technical Competencies & Skill Matrix")

        c.setStrokeColor(HexColor('#E4E4E7'))
        c.setLineWidth(0.8)
        c.line(self.margin, y_start - 3, self.width - self.margin, y_start - 3)

        y = y_start - 15
        cats = [
            ('Languages', skills.get('programming_languages', [])),
            ('Frameworks & Libs', skills.get('frameworks', [])),
            ('Databases', skills.get('databases', [])),
            ('Tools & Platforms', skills.get('tools', [])),
        ]

        for cat_name, skill_list in cats:
            if skill_list:
                text = ', '.join(skill_list)
                c.setFont("Helvetica-Bold", 8.5)
                c.setFillColor(HexColor('#09090C'))
                c.drawString(self.margin, y, f"{cat_name}:")
                c.setFont("Helvetica", 8.5)
                c.setFillColor(HexColor('#52525B'))
                c.drawString(self.margin + 90, y, text[:90])
                y -= 13

        return y - 6

    def _draw_experience_section(self, c, data, y_start):
        exp = data.get('experience', {})
        positions = exp.get('positions', [])

        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(HexColor('#050505'))
        c.drawString(self.margin, y_start, f"Work Experience ({exp.get('total_years', 0)} Years Total)")

        c.setStrokeColor(HexColor('#E4E4E7'))
        c.line(self.margin, y_start - 3, self.width - self.margin, y_start - 3)

        y = y_start - 15
        if not positions:
            c.setFont("Helvetica-Oblique", 8.5)
            c.setFillColor(HexColor('#71717A'))
            c.drawString(self.margin, y, "No formal work experience entries detected.")
            return y - 15

        for pos in positions[:2]:
            role = pos.get('role') or "Software Professional"
            company = pos.get('company') or "Company"
            duration = pos.get('duration') or "Recent"

            c.setFont("Helvetica-Bold", 9)
            c.setFillColor(HexColor('#09090C'))
            c.drawString(self.margin, y, f"{role} — {company}")

            c.setFont("Helvetica", 8)
            c.setFillColor(HexColor('#71717A'))
            c.drawRightString(self.width - self.margin, y, duration)

            y -= 11
            desc = pos.get('description', '')
            if desc:
                bullets = [b.strip('•-* ').strip() for b in desc.split('\n') if b.strip()]
                c.setFont("Helvetica", 8)
                c.setFillColor(HexColor('#3F3F46'))
                for bullet in bullets[:3]:
                    c.drawString(self.margin + 8, y, f"• {bullet[:110]}")
                    y -= 10
            y -= 4

        return y - 4

    def _draw_projects_section(self, c, data, y_start):
        projects = data.get('projects', [])
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(HexColor('#050505'))
        c.drawString(self.margin, y_start, f"Project Portfolio Assessment ({len(projects)} Projects Analyzed)")

        c.setStrokeColor(HexColor('#E4E4E7'))
        c.line(self.margin, y_start - 3, self.width - self.margin, y_start - 3)

        y = y_start - 15
        for proj in projects[:3]:
            title = proj.get('title') or "Software Project"
            techs = proj.get('technologies', [])
            tech_str = f" [{', '.join(techs)}]" if techs else ""

            c.setFont("Helvetica-Bold", 8.5)
            c.setFillColor(HexColor('#09090C'))
            c.drawString(self.margin, y, title)

            if tech_str:
                c.setFont("Helvetica", 8)
                c.setFillColor(HexColor('#FF2D55'))
                c.drawString(self.margin + c.stringWidth(title, "Helvetica-Bold", 8.5) + 4, y, tech_str[:70])

            y -= 11
            desc = proj.get('description', '')
            if desc:
                bullets = [b.strip('•-* ').strip() for b in desc.split('\n') if b.strip()]
                c.setFont("Helvetica", 8)
                c.setFillColor(HexColor('#3F3F46'))
                for bullet in bullets[:2]:
                    c.drawString(self.margin + 8, y, f"• {bullet[:110]}")
                    y -= 10
            y -= 3

        return y - 4

    def _draw_education_section(self, c, data, y_start):
        education = data.get('education', [])
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(HexColor('#050505'))
        c.drawString(self.margin, y_start, "Academic Background & Qualifications")

        c.setStrokeColor(HexColor('#E4E4E7'))
        c.line(self.margin, y_start - 3, self.width - self.margin, y_start - 3)

        y = y_start - 15
        if not education:
            c.setFont("Helvetica-Oblique", 8.5)
            c.setFillColor(HexColor('#71717A'))
            c.drawString(self.margin, y, "No formal education entries detected.")
            return y - 15

        for edu in education[:2]:
            degree = edu.get('degree') or "Degree"
            inst = edu.get('institution') or ""
            year = edu.get('year') or ""
            gpa = f" (Score: {edu['gpa']})" if edu.get('gpa') else ""

            c.setFont("Helvetica-Bold", 8.5)
            c.setFillColor(HexColor('#09090C'))
            c.drawString(self.margin, y, f"• {degree}{gpa}")

            c.setFont("Helvetica", 8)
            c.setFillColor(HexColor('#52525B'))
            details = f"{inst} | {year}" if inst and year else inst or year
            c.drawRightString(self.width - self.margin, y, details)
            y -= 12

        return y

    def _draw_keywords_section(self, c, data, y_start):
        kw = data.get('keywords_analysis', {})
        found = kw.get('found', [])
        missing = kw.get('missing', [])

        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(HexColor('#050505'))
        c.drawString(self.margin, y_start, "Industry Keyword Match Analysis")

        c.setStrokeColor(HexColor('#E4E4E7'))
        c.line(self.margin, y_start - 3, self.width - self.margin, y_start - 3)

        y = y_start - 16
        c.setFont("Helvetica-Bold", 8.5)
        c.setFillColor(HexColor('#10B981'))
        c.drawString(self.margin, y, f"Detected Industry Keywords ({len(found)}):")
        c.setFont("Helvetica", 8)
        c.setFillColor(HexColor('#3F3F46'))
        c.drawString(self.margin + 160, y, ", ".join(found[:10]))

        y -= 14
        c.setFont("Helvetica-Bold", 8.5)
        c.setFillColor(HexColor('#FF2D55'))
        c.drawString(self.margin, y, f"Recommended Missing Keywords ({len(missing)}):")
        c.setFont("Helvetica", 8)
        c.setFillColor(HexColor('#3F3F46'))
        c.drawString(self.margin + 180, y, ", ".join(missing[:10]))

        return y - 15

    def _draw_issues_section(self, c, data, y_start):
        issues = data.get('issues', [])
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(HexColor('#FF2D55'))
        c.drawString(self.margin, y_start, f"ATS Formatting Warnings & Compliance Errors ({len(issues)})")

        c.setStrokeColor(HexColor('#E4E4E7'))
        c.line(self.margin, y_start - 3, self.width - self.margin, y_start - 3)

        y = y_start - 16
        if not issues:
            c.setFont("Helvetica", 8.5)
            c.setFillColor(HexColor('#10B981'))
            c.drawString(self.margin, y, "✔ Excellent formatting! Zero critical ATS layout issues detected.")
            return y - 20

        for issue in issues[:4]:
            sev = issue.get('severity', 'Medium')
            msg = issue.get('message', issue.get('description', ''))
            sug = issue.get('suggestion', '')

            c.setFont("Helvetica-Bold", 8.5)
            c.setFillColor(HexColor('#FF2D55') if sev.lower() in ['high', 'critical'] else HexColor('#F59E0B'))
            c.drawString(self.margin, y, f"[{sev.upper()}] {msg}")

            y -= 11
            if sug:
                c.setFont("Helvetica", 8)
                c.setFillColor(HexColor('#52525B'))
                c.drawString(self.margin + 10, y, f"→ Action: {sug[:110]}")
                y -= 11
            y -= 3

        return y - 10

    def _draw_suggestions_section(self, c, data, y_start):
        suggestions = data.get('suggestions', [])
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(HexColor('#050505'))
        c.drawString(self.margin, y_start, "AI Optimization & Growth Roadmap")

        c.setStrokeColor(HexColor('#E4E4E7'))
        c.line(self.margin, y_start - 3, self.width - self.margin, y_start - 3)

        y = y_start - 16
        for i, sug in enumerate(suggestions[:4], 1):
            title = sug.get('title', '')
            desc = sug.get('description', '')
            priority = sug.get('priority', 'Medium')

            c.setFont("Helvetica-Bold", 8.5)
            c.setFillColor(HexColor('#09090C'))
            c.drawString(self.margin, y, f"{i}. {title} [{priority} Priority]")

            y -= 11
            c.setFont("Helvetica", 8)
            c.setFillColor(HexColor('#52525B'))
            c.drawString(self.margin + 12, y, desc[:120])
            y -= 14

        return y

    def _draw_page_footer(self, c, page_num):
        y = 20
        c.setFont("Helvetica-Bold", 8)
        c.setFillColor(HexColor('#A1A1AA'))
        c.drawString(self.margin, y, "NexGenCV AI — AI Powered Resume Intelligence Platform")
        c.drawRightString(self.width - self.margin, y, f"Page {page_num} of 2")
