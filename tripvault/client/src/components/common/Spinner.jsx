import React from 'react';

/**
 * Spinner - A standard animated SVG spinner icon
 * @param {string} size - size class for width and height (default: 'w-6 h-6')
 * @param {string} color - color class for the stroke (default: 'text-primary')
 */
export const Spinner = ({ size = 'w-6 h-6', color = 'text-blue-500', className = '' }) => {
  return (
    <svg
      className={`animate-spin ${size} ${color} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label="Loading"
      style={{
        width: size.includes('w-') ? undefined : size,
        height: size.includes('h-') ? undefined : size,
        display: 'inline-block'
      }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Spinner;
