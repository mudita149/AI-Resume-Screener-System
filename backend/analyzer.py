import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from a .env file if it exists
load_dotenv()

# Retrieve the API key from the environment
api_key = os.getenv("GEMINI_API_KEY")

if api_key:
    # Configure the Gemini SDK with the API key
    genai.configure(api_key=api_key)
else:
    print("WARNING: GEMINI_API_KEY is not set. The analyzer will fail to make API calls.")

def analyze_resume(resume_text, job_description_text):
    """
    Sends resume and job description text to Google Gemini API to analyze suitability.
    
    Args:
        resume_text (str): The raw text extracted from the candidate's resume.
        job_description_text (str): The text of the job description.
        
    Returns:
        dict: The structured evaluation result parsed from Gemini's JSON response.
    """
    # 1. Check if the API key is available
    if not api_key:
        return {
            "error": "Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file."
        }
        
    # 2. Construct the system prompt for Gemini
    prompt = f"""
You are an experienced technical recruiter and ATS screening system.
Analyze the candidate's resume against the provided job description.

Evaluate:
1. Technical skills match
2. Experience relevance
3. Education relevance
4. Project relevance
5. Overall suitability

Estimate a realistic ATS-style match score from 0 to 100.

Extract Candidate Information:
- Candidate Name (Full Name)
- Email
- Phone Number
- LinkedIn URL (The full profile link. If a specific personal profile is not present, return an empty string. Do not return generic domain names like "linkedin.com" or "www.linkedin.com")
- GitHub URL (The full profile link. If a specific personal profile is not present, return an empty string. Do not return generic domain names like "github.com" or "www.github.com")

Generate:
- Match Score (integer between 0 and 100)
- 5-point Candidate Summary (an array of exactly 5 concise, professional bullet points summarizing their profile)
- Matching Skills (array of skills present in both resume and job description)
- Missing Skills (array of skills required in the job description but missing or weak in the resume)
- Hiring Recommendation (a detailed recruiter recommendation)

You must return ONLY a valid JSON object matching the following structure exactly:
{{
  "candidate_name": "string",
  "email": "string",
  "phone": "string",
  "linkedin": "string",
  "github": "string",
  "match_score": integer,
  "summary": ["string", "string", "string", "string", "string"],
  "matching_skills": ["string"],
  "missing_skills": ["string"],
  "recommendation": "string"
}}

Do not include any markdown format tags like ```json or trailing text. Return raw JSON.

Resume Content:
{resume_text}

Job Description Content:
{job_description_text}
"""

    try:
        # 3. Instantiate the Gemini 2.5 Flash model
        model = genai.GenerativeModel("gemini-2.5-flash")
        
        # 4. Generate content, forcing JSON mime type in generation config
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        
        # 5. Parse the returned text as JSON
        result = json.loads(response.text)
        return result
        
    except json.JSONDecodeError as jde:
        print(f"JSON parsing error: {jde}")
        return {
            "error": "Failed to parse Gemini output as JSON.",
            "raw_response": response.text if 'response' in locals() else ""
        }
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return {
            "error": f"An error occurred during AI analysis: {str(e)}"
        }
