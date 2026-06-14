import React from 'react';

export default function CandidateInfo({ candidate }) {
  if (!candidate) return null;

  const { candidate_name, email, phone, linkedin, github } = candidate;

  // Helper function to format external URLs correctly
  const formatUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 h-full transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="p-1.5 bg-blue-50 text-blue-600 rounded-md">👤</span>
        Candidate Profile
      </h3>

      <div className="space-y-5">
        {/* Candidate Name */}
        {candidate_name ? (
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Name</span>
            <p className="text-xl font-bold text-gray-900 mt-1">{candidate_name}</p>
          </div>
        ) : (
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Name</span>
            <p className="text-sm italic text-gray-500 mt-1">Not found in resume</p>
          </div>
        )}

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Address</span>
            {email ? (
              <p className="text-sm font-medium text-gray-800 mt-1 break-all">
                <a href={`mailto:${email}`} className="text-blue-600 hover:underline hover:text-blue-800 transition-colors">
                  {email}
                </a>
              </p>
            ) : (
              <p className="text-sm italic text-gray-500 mt-1">Not found</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Phone Number</span>
            {phone ? (
              <p className="text-sm font-medium text-gray-800 mt-1">{phone}</p>
            ) : (
              <p className="text-sm italic text-gray-500 mt-1">Not found</p>
            )}
          </div>
        </div>

        {/* Professional Profiles Section */}
        <div className="border-t border-gray-100 pt-5">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-3">Professional Links</span>
          <div className="flex flex-wrap gap-3">
            {/* LinkedIn Link */}
            {linkedin ? (
              <a
                href={formatUrl(linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-all duration-200"
              >
                <span className="text-sm">🔗</span> LinkedIn
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-gray-50 text-gray-400">
                <span className="text-sm">🔗</span> LinkedIn (N/A)
              </span>
            )}

            {/* GitHub Link */}
            {github ? (
              <a
                href={formatUrl(github)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
              >
                <span className="text-sm">💻</span> GitHub
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-gray-50 text-gray-400">
                <span className="text-sm">💻</span> GitHub (N/A)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
