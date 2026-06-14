import React from 'react';
import CandidateInfo from './CandidateInfo';

export default function DashboardResults({ results }) {
  if (!results) return null;

  const {
    match_score,
    status,
    summary,
    matching_skills,
    missing_skills,
    recommendation,
    candidate_name,
    email,
    phone,
    linkedin,
    github
  } = results;

  const isEligible = status === 'Eligible';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* 1. Status and Progress Bar Header Card */}
      <div className={`p-6 rounded-2xl border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 ${
        isEligible 
          ? 'bg-emerald-50/40 border-emerald-100/80 shadow-emerald-50/50' 
          : 'bg-rose-50/40 border-rose-100/80 shadow-rose-50/50'
      }`}>
        {/* Status Badge */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">ATS Match Analysis</span>
          <div className="flex items-center gap-2.5">
            <span className={`w-3.5 h-3.5 rounded-full ${isEligible ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500 animate-pulse'}`}></span>
            <h2 className={`text-2xl font-black ${isEligible ? 'text-emerald-800' : 'text-rose-800'}`}>
              {status}
            </h2>
          </div>
        </div>

        {/* Progress Bar and Score */}
        <div className="flex flex-col items-center md:items-end w-full md:w-80 gap-2">
          <div className="flex justify-between w-full text-sm font-semibold text-gray-600">
            <span>Overall Match Score</span>
            <span className={`font-black text-base ${isEligible ? 'text-emerald-600' : 'text-rose-600'}`}>
              {match_score}%
            </span>
          </div>
          {/* Outer container */}
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden shadow-inner">
            {/* Moving fill bar */}
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                isEligible ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              style={{ width: `${match_score}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Layout */}
      {isEligible ? (
        /* ================= ELIGIBLE CANDIDATE LAYOUT ================= */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Candidate Details Card */}
          <div className="md:col-span-1">
            <CandidateInfo candidate={{ candidate_name, email, phone, linkedin, github }} />
          </div>

          {/* Right: Technical Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Skills Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Matching Skills */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <span className="text-sm">✅</span> Matching Skills
                </h4>
                {matching_skills && matching_skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {matching_skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs italic text-gray-400">None detected</p>
                )}
              </div>

              {/* Missing Skills */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
                <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <span className="text-sm">❌</span> Missing Skills
                </h4>
                {missing_skills && missing_skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {missing_skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs italic text-emerald-600 font-medium">Fully matching skills set!</p>
                )}
              </div>
            </div>

            {/* Hiring Recommendation */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span className="text-sm">💡</span> Recruiter Recommendation
              </h4>
              <p className="text-sm leading-relaxed text-gray-600">
                {recommendation}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ================= NOT ELIGIBLE CANDIDATE LAYOUT ================= */
        <div className="space-y-6">
          {/* Candidate Summary (5 points) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="text-sm">📝</span> Candidate Summary
            </h4>
            {summary && summary.length > 0 ? (
              <ul className="space-y-3.5">
                {summary.map((point, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-sm text-gray-600 leading-relaxed">
                    <span className="text-rose-500 font-black mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm italic text-gray-400">Summary not generated.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Missing Skills (Takes 1/3 space) */}
            <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <span className="text-sm">❌</span> Missing Skills
              </h4>
              {missing_skills && missing_skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {missing_skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100/50">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs italic text-gray-400">None detected</p>
              )}
            </div>

            {/* Reasons why not suitable (Takes 2/3 space) */}
            <div className="md:col-span-2 bg-rose-50/20 p-6 rounded-2xl border border-rose-100/50 shadow-xl">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span className="text-sm">⚠️</span> Reasons for Non-Suitability
              </h4>
              <p className="text-sm leading-relaxed text-rose-800/90 font-medium">
                {recommendation}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
