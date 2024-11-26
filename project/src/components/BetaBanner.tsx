import React from 'react';

export default function BetaBanner() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600/10 via-red-500/10 to-orange-500/10 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center flex-wrap"> {/* Changed to center */}
          <div className="flex items-center min-w-0">
            <span className="flex p-2 rounded-lg bg-purple-500/10">
              <span className="text-purple-600 dark:text-purple-300">🚀</span> {/* Changed emoji */}
            </span>
            <div className="ml-3 font-medium text-center"> {/* Added text-center */}
              <span className="md:hidden text-sm">Welcome to Our Beta Release</span>
              <span className="hidden md:inline">
                <span className="font-semibold text-purple-600 dark:text-purple-300">
                  Early Access Preview:
                </span>
                {' '}Your feedback shapes our future.
                <span className="ml-1 text-gray-600 dark:text-gray-300">
                  Some model's are uncensored, use are your discretion.
                </span>
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 tracking-wide">
              BETA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}