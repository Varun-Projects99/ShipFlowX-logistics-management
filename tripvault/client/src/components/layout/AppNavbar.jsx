import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Search, Bell, LogOut, User as UserIcon, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const AppNavbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <header className="glass-nav" style={{
      height: '70px',
      position: 'sticky',
      top: 0,
      zIndex: 90,
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', justifyContent: 'space-between' }}>
        {/* Left: Mobile menu toggle + Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onToggleSidebar}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem'
            }}
            aria-label="Toggle Navigation"
          >
            <Menu size={22} />
          </button>

          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Compass size={20} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              Trip<span className="gradient-text">Vault</span>
            </span>
          </Link>
        </div>

        {/* Center: Live Global Search */}
        <div style={{ flex: 1, maxWidth: '450px', margin: '0 1rem', display: 'none' }} className="nav-search-container">
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Global Search: Trips, destinations, photos, stories, tags..."
              style={{
                width: '100%',
                padding: '0.5rem 1rem 0.5rem 2.6rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                color: 'var(--text-main)',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  window.location.href = `/trips?search=${encodeURIComponent(e.target.value.trim())}`;
                }
              }}
            />
          </div>
        </div>

        {/* Right: Notifications, User Avatar & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Notification Icon */}
          <button style={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-full)',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }} title="Notifications (0)">
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)'
            }} />
          </button>

          {/* User Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary) 0%, #818CF8 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.95rem',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}>
              {userInitial}
            </div>
            <div style={{ display: 'none' }} className="user-name-display">
              <span style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', color: 'var(--text-main)' }}>
                {user?.name || 'Traveler'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>
                {user?.email || ''}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="btn btn-outline"
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            title="Logout"
          >
            <LogOut size={16} />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .nav-search-container { display: block !important; }
          .user-name-display { display: block !important; }
        }
        @media (max-width: 480px) {
          .logout-text { display: none; }
        }
      `}</style>
    </header>
  );
};
