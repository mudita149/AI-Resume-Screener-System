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
    links = []
    try:
        # Open the PDF file stream using pdfplumber
        with pdfplumber.open(file_stream) as pdf:
            # Loop through each page in the PDF document
            for page in pdf.pages:
                page_text = page.extract_text()
                # If text exists on the page, append it to our main text string
                if page_text:
                    text += page_text + "\n"
                
                # Extract any underlying hyperlinks from PDF annotations
                try:
                    if hasattr(page, 'hyperlinks') and page.hyperlinks:
                        for link in page.hyperlinks:
                            uri = link.get("uri")
                            if uri and uri not in links:
                                links.append(uri)
                except Exception as link_err:
                    print(f"Error extracting links from page: {link_err}")
        
        # Append extracted links to the end of the text if any exist
        if links:
            text += "\n\n--- Extracted Hyperlinks ---\n"
            for link in links:
                text += f"- {link}\n"
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return ""
        
    return text.strip()
