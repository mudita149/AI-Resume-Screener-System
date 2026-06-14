import React, { useState } from 'react';

export default function UploadCard({ onAnalyze, loading }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [jdText, setJdText] = useState('');
  const [jdMode, setJdMode] = useState('text'); // 'text' or 'file'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload a resume PDF file.");
      return;
    }
    if (jdMode === 'text' && !jdText.trim()) {
      alert("Please paste the job description text.");
      return;
    }
    if (jdMode === 'file' && !jdFile) {
      alert("Please upload a job description PDF file.");
      return;
    }
    // Pass the state up to the parent component
    onAnalyze({ resumeFile, jdFile, jdText, jdMode });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">📋</span>
        Candidate & Job Screening
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Resume Upload Card */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              1. Candidate Resume (PDF only) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center justify-center w-full">
              <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                resumeFile 
                  ? 'border-emerald-500 bg-emerald-50/30 shadow-inner' 
                  : 'border-gray-300 bg-gray-50/50 hover:bg-gray-50 hover:border-emerald-400'
              }`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                  <span className="text-3xl mb-2">📄</span>
                  {resumeFile ? (
                    <>
                      <p className="text-sm font-semibold text-emerald-600 truncate max-w-[200px] md:max-w-xs">
                        {resumeFile.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Click or drag to change
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-gray-700">
                        Upload Resume PDF
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Drag & drop or click to browse
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          {/* Job Description Card */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
                2. Job Description <span className="text-red-500">*</span>
              </label>
              
              {/* Mode Toggle Tab */}
              <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setJdMode('text')}
                  className={`px-3 py-1 rounded-md font-medium transition-all duration-200 ${
                    jdMode === 'text' 
                      ? 'bg-white text-gray-800 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Paste Text
                </button>
                <button
                  type="button"
                  onClick={() => setJdMode('file')}
                  className={`px-3 py-1 rounded-md font-medium transition-all duration-200 ${
                    jdMode === 'file' 
                      ? 'bg-white text-gray-800 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Upload PDF
                </button>
              </div>
            </div>

            {/* Render Textarea or File Dropzone dynamically */}
            {jdMode === 'text' ? (
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the Job Description requirements, duties, and skills here..."
                className="w-full h-40 border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none transition-all duration-200"
              />
            ) : (
              <div className="flex items-center justify-center w-full">
                <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                  jdFile 
                    ? 'border-emerald-500 bg-emerald-50/30 shadow-inner' 
                    : 'border-gray-300 bg-gray-50/50 hover:bg-gray-50 hover:border-emerald-400'
                }`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    <span className="text-3xl mb-2">💼</span>
                    {jdFile ? (
                      <>
                        <p className="text-sm font-semibold text-emerald-600 truncate max-w-[200px] md:max-w-xs">
                          {jdFile.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Click or drag to change
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-gray-700">
                          Upload Job Description PDF
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Drag & drop or click to browse
                        </p>
                      </>
                    )}
                  </div>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    className="hidden" 
                    onChange={(e) => setJdFile(e.target.files[0])}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3.5 text-sm font-semibold rounded-xl text-white shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {loading ? 'Analyzing Application...' : 'Compare & Analyze Resume'}
          </button>
        </div>
      </form>
    </div>
  );
}
