import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, Shield, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        {/* Brand Logo & Tagline */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}>
            <Compass size={24} color="#FFFFFF" />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
              Trip<span className="gradient-text">Vault</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Preserve Adventures
            </span>
          </div>
        </Link>

        {/* Desktop Navigation CTA */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary">
              <UserCheck size={18} />
              Go to Dashboard ({user?.name?.split(' ')[0] || 'User'})
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '1.5rem',
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary btn-full" onClick={() => setMobileMenuOpen(false)}>
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-full" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-full" onClick={() => setMobileMenuOpen(false)}>
                Register Now
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};
