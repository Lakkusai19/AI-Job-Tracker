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
            {
                "error": "job_title, company and skills are required."
            },
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

4. Do NOT invent any technologies, certifications, or experience.

5. Do NOT include placeholders like:
[Your Name]
[Email]
[Phone]
[Date]

6. Keep it professional.

7. Length: 180-220 words.

8. End with:

Sincerely,
Candidate

Return ONLY the cover letter.
"""

    try:
        print("\n========== GOOGLE GENAI ==========")
        print("API Key Loaded:", bool(settings.GEMINI_API_KEY))
        print("Using Model: gemini-3.6-flash")
        print("=================================\n")

        client = genai.Client(api_key=settings.GEMINI_API_KEY)

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
        )

        print("Gemini Response Received")

        cover_letter = ""

        if hasattr(response, "text") and response.text:
            cover_letter = response.text.strip()

        if not cover_letter:
            return Response(
                {
                    "error": "Gemini returned an empty response."
                },
                status=500,
            )

        return Response(
            {
                "cover_letter": cover_letter
            },
            status=200,
        )

    except Exception as e:
        print("\n========== GEMINI ERROR ==========")
        traceback.print_exc()
        print("==================================\n")

        return Response(
            {
                "error": str(e),
                "traceback": traceback.format_exc(),
            },
            status=500,
        )