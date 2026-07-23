import React from 'react';
import { Compass, Heart, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-glass-heavy)',
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 0 2rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Compass size={20} color="#FFFFFF" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                Trip<span className="gradient-text">Vault</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', maxWidth: '300px' }}>
              Capture Memories. Preserve Adventures. Secure your travel experiences in your personal cloud vault.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-dim)' }}>
              <Globe size={18} />
              <Shield size={18} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li><Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link></li>
              <li><Link to="/register" style={{ color: 'var(--text-muted)' }}>Register</Link></li>
              <li><Link to="/login" style={{ color: 'var(--text-muted)' }}>Login</Link></li>
              <li><Link to="/dashboard" style={{ color: 'var(--text-muted)' }}>Dashboard</Link></li>
            </ul>
          </div>

          {/* Features Overview */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Platform Features</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li>Travel Journal</li>
              <li>Photo Memories</li>
              <li>Secure Cloud Storage</li>
              <li>Trip Analytics</li>
              <li>Travel Timeline</li>
            </ul>
          </div>

          {/* Architecture info */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Technology</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
              Built with React 19, Vite, Express, Mongoose, and JWT Authentication.
            </p>
            <div style={{
              marginTop: '1rem',
              display: 'inline-block',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              fontSize: '0.75rem',
              color: 'var(--primary)'
            }}>
              Week 1 Production Architecture
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-dim)'
        }}>
          <div>&copy; {new Date().getFullYear()} TripVault. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Crafted for world travelers with <Heart size={14} color="var(--error)" fill="var(--error)" />
          </div>
        </div>
      </div>
    </footer>
  );
};
