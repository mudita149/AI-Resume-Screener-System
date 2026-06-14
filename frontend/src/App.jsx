import React, { useState } from 'react';
import UploadCard from './components/UploadCard';
import DashboardResults from './components/DashboardResults';
import Spinner from './components/Spinner';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async ({ resumeFile, jdFile, jdText, jdMode }) => {
    setLoading(true);
    setError('');
    setResults(null);

    // 1. Create a FormData instance to hold files and fields
    const formData = new FormData();
    formData.append('resume', resumeFile);

    if (jdMode === 'file') {
      formData.append('job_description_file', jdFile);
    } else {
      formData.append('job_description_text', jdText);
    }

    try {
      // 2. Make the HTTP POST request to our Flask server
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/analyze`, {
        method: 'POST',
        body: formData, // Fetch automatically sets the content-type header to 'multipart/form-data'
      });

      const data = await response.json();

      // 3. Handle errors returned by the Flask backend
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred during screening.');
      }

      // 4. Update the results state on success
      setResults(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to connect to the backend server. Make sure it is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Block */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100/60 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            AI-Powered Recruiting
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            ATS Resume Screener
          </h1>
          <p className="max-w-xl mx-auto text-base text-gray-500 font-medium">
            Analyze resumes, identify skill gaps, and evaluate candidate-job fit in seconds.
          </p>
        </header>

        {/* Error Alert Box */}
        {error && (
          <div className="max-w-4xl mx-auto p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3 shadow-sm">
            <span className="text-lg">⚠️</span>
            <div className="text-sm">
              <span className="font-bold text-rose-800">Error: </span>
              <span className="text-rose-700 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-4xl mx-auto">
            <Spinner />
          </div>
        )}

        {/* Upload Card (Only show when not loading and no results exist) */}
        {!loading && !results && (
          <UploadCard onAnalyze={handleAnalyze} loading={loading} />
        )}

        {/* Assessment Dashboard Results (Show when results exist) */}
        {!loading && results && (
          <div className="space-y-6">
            <DashboardResults results={results} />
            
            {/* Reset / Screen New Candidate Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 bg-white shadow-sm transition-all duration-200 hover:bg-gray-50 hover:text-gray-800"
              >
                ← Screen Another Resume
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

