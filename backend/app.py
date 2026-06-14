from flask import Flask, request, jsonify
from flask_cors import CORS
from parser import extract_text_from_pdf
from analyzer import analyze_resume

# Initialize the Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS)
# This allows our React app running on a different port (e.g. 5173) to communicate with this Flask backend (port 5000)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    """
    POST /analyze API endpoint.
    Expects:
        - Files: 'resume' (PDF, required)
        - Files: 'job_description_file' (PDF, optional)
        - Form data: 'job_description_text' (string, optional, used if no file is uploaded)
    """
    
    # 1. Check if the resume file was uploaded
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file provided. Please upload a resume PDF."}), 400
        
    resume_file = request.files['resume']
    
    # Verify a file was selected and it is a PDF
    if resume_file.filename == '':
        return jsonify({"error": "No resume file selected."}), 400
        
    if not resume_file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Invalid resume format. Only PDF files are supported."}), 400

    # 2. Retrieve job description text (either from PDF file or text form field)
    jd_text = ""
    
    # Case A: The recruiter uploaded a Job Description PDF file
    if 'job_description_file' in request.files:
        jd_file = request.files['job_description_file']
        if jd_file.filename != '' and jd_file.filename.lower().endswith('.pdf'):
            jd_text = extract_text_from_pdf(jd_file)
            
    # Case B: The recruiter pasted the Job Description text in the text area
    if not jd_text and 'job_description_text' in request.form:
        jd_text = request.form['job_description_text']
        
    # Verify we got some job description content to compare against
    if not jd_text or not jd_text.strip():
        return jsonify({"error": "No job description text or file provided."}), 400

    # 3. Extract text from the candidate's resume PDF
    resume_text = extract_text_from_pdf(resume_file)
    if not resume_text or not resume_text.strip():
        return jsonify({"error": "Failed to extract text from the resume PDF. Make sure it contains readable text."}), 400

    # 4. Call the Gemini analyzer helper
    analysis = analyze_resume(resume_text, jd_text)
    
    # If the Gemini call failed or key is missing, propagate the error response
    if "error" in analysis:
        return jsonify(analysis), 500

    # 5. Apply Eligibility Logic
    match_score = analysis.get("match_score", 0)
    try:
        # Guarantee score is a numerical value
        match_score = int(match_score)
    except (ValueError, TypeError):
        match_score = 0
        
    # If Match Score >= 70, status is Eligible, else Not Eligible
    status = "Eligible" if match_score >= 70 else "Not Eligible"

    # 6. Format response structure exactly as requested
    response_data = {
        "match_score": match_score,
        "status": status,
        "candidate_name": analysis.get("candidate_name", ""),
        "email": analysis.get("email", ""),
        "phone": analysis.get("phone", ""),
        "linkedin": analysis.get("linkedin", ""),
        "github": analysis.get("github", ""),
        "summary": analysis.get("summary", []),
        "matching_skills": analysis.get("matching_skills", []),
        "missing_skills": analysis.get("missing_skills", []),
        "recommendation": analysis.get("recommendation", "")
    }

    return jsonify(response_data), 200

if __name__ == '__main__':
    # Start the Flask development server on port 5000
    app.run(debug=True, port=5000)
