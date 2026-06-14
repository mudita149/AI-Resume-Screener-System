import pdfplumber

def extract_text_from_pdf(file_stream):
    """
    Extracts all text from a PDF file stream.
    
    Args:
        file_stream: A file-like object containing PDF data.
        
    Returns:
        str: The extracted text from the PDF.
    """
    text = ""
    try:
        # Open the PDF file stream using pdfplumber
        with pdfplumber.open(file_stream) as pdf:
            # Loop through each page in the PDF document
            for page in pdf.pages:
                page_text = page.extract_text()
                # If text exists on the page, append it to our main text string
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return ""
        
    return text.strip()
