import React from 'react';
import Spinner from './Spinner';

/**
 * PageLoader - Full screen loading overlay with animated backdrop
 * @param {string} message - display label
 */
export const PageLoader = ({ message = 'Initializing ShipFlowX...' }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'var(--bg-main, #0F172A)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999999,
      gap: '1rem',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        padding: '2.5rem',
        borderRadius: 'var(--radius-lg, 12px)',
        backgroundColor: 'var(--bg-card, #1E293B)',
        border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
        boxShadow: 'var(--shadow-lg, 0 10px 25px rgba(0,0,0,0.5))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <Spinner size="40px" color="text-blue-500" />
        <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main, #FFFFFF)' }}>
          {message}
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
