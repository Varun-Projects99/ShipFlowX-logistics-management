import React from 'react';
import Spinner from './Spinner';

/**
 * Loader - A reusable centered container wrapping the Spinner
 * @param {string} message - Optional text to show next to/below the spinner
 * @param {string} size - spinner size
 * @param {boolean} inline - if true, renders without full width/height centering container
 */
export const Loader = ({ message = 'Loading...', size = '32px', inline = false }) => {
  if (inline) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
        <Spinner size={size} />
        {message && <span style={{ fontSize: '0.875rem' }}>{message}</span>}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '2rem',
      width: '100%'
    }}>
      <Spinner size={size} />
      {message && (
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          {message}
        </span>
      )}
    </div>
  );
};

export default Loader;
