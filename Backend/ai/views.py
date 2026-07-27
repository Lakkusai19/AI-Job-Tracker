from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from google import genai
import traceback


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def generate_cover_letter(request):

    job_title = request.data.get("job_title")
    company = request.data.get("company")
    skills = request.data.get("skills")

    if not job_title or not company or not skills:
        return Response(
            {"error": "job_title, company and skills are required"},
            status=400,
        )

    prompt = f"""
You are an expert HR recruiter.

Generate a professional cover letter.

Candidate Information:
- Job Title: {job_title}
- Company: {company}
- Skills: {skills}

Requirements:

1. Start with:
Dear Hiring Manager,

2. Apply specifically for the {job_title} position at {company}.

3. Use ONLY the skills provided:
{skills}

4. Do NOT invent or mention technologies, certifications, or experiences that are not listed.

5. Do NOT use placeholders like:
[Your Name]
[Date]
[Email]
[Phone]
[LinkedIn]

6. Write naturally as a motivated software developer.

7. Keep it between 180 and 220 words.

8. End with:

Sincerely,
Candidate

Return ONLY the cover letter.
"""

    try:
        print("========== GOOGLE GENAI ==========")
        print("API Key Loaded:", bool(settings.GEMINI_API_KEY))
        print("=================================")

        client = genai.Client(api_key=settings.GEMINI_API_KEY)

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
        )

        cover_letter = response.text

        if not cover_letter:
            return Response(
                {"error": "Gemini returned an empty response."},
                status=500,
            )

        return Response(
            {
                "cover_letter": cover_letter
            }
        )

    except Exception as e:
        print("========== GEMINI ERROR ==========")
        print(traceback.format_exc())
        print("==================================")

        return Response(
            {
                "error": str(e),
                "traceback": traceback.format_exc(),
            },
            status=500,
        )