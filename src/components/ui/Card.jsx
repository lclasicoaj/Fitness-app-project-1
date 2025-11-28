import React from 'react';

export function Card({ children, className = '', onClick }) {
  const clickable = onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : '';
  
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-gray-200 p-4 ${clickable} ${className}`}
    >
      {children}
    </div>
  );
}
