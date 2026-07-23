import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Image as ImageIcon,
  Clock,
  BarChart3,
  Heart,
  User,
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const AppSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Trips', path: '/trips', icon: MapPin },
    { label: 'Gallery', path: '/gallery', icon: ImageIcon },
    { label: 'Timeline', path: '/timeline', icon: Clock },
    { label: 'Statistics', path: '/statistics', icon: BarChart3 },
    { label: 'Favorites', path: '/favorites', icon: Heart },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <aside style={{
      width: isOpen ? '260px' : '70px',
      transition: 'width 0.3s ease',
      backgroundColor: 'var(--bg-card)',
      borderRight: '1px solid var(--border-color)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.5rem 0.75rem',
      overflowY: 'auto',
      flexShrink: 0,
      boxSizing: 'border-box'
    }}>
      {/* Navigation Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768) onClose();
              }}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.925rem',
                transition: 'all 0.2s ease',
                position: 'relative'
              })}
            >
              <Icon size={20} style={{ flexShrink: 0 }} />
              {isOpen && (
                <span style={{ whiteSpace: 'nowrap', flex: 1 }}>{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Logout at bottom */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            color: 'var(--error)',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            cursor: 'pointer',
            fontSize: '0.925rem',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
        >
          <LogOut size={20} style={{ flexShrink: 0 }} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
