import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export function PageHeader({ title, showBack = false, action }) {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
        {action && <div>{action}</div>}
      </div>
    </header>
  );
}
