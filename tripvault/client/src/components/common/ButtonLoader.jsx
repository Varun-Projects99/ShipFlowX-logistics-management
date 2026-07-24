import React from 'react';
import Spinner from './Spinner';

/**
 * ButtonLoader - Loading state indicator for CTA button components
 * @param {string} message - text to display alongside spinner
 * @param {string} size - spinner size
 */
export const ButtonLoader = ({ message = 'Processing...', size = '16px' }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
      <Spinner size={size} color="currentColor" />
      <span>{message}</span>
    </div>
  );
};

export default ButtonLoader;
