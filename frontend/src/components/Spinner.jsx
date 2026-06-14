import React from 'react';

export default function Spinner({ message = "Analyzing Resume with AI..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {/* Spinner Animation Container */}
      <div className="relative w-16 h-16">
        {/* Spinning outer circle */}
        <div className="absolute inset-0 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
        {/* Pulsing inner dot for a premium feel */}
        <div className="absolute inset-3 rounded-full bg-emerald-500 opacity-75 animate-ping"></div>
      </div>
      {/* Loading text with pulse fade animation */}
      <p className="text-gray-600 font-medium text-sm animate-pulse tracking-wide">
        {message}
      </p>
    </div>
  );
}
