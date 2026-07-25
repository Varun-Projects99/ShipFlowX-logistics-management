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
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../constants/routes';

export const AppSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const navItems = [
    { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { label: 'Shipments', path: ROUTES.TRIPS, icon: MapPin },
    { label: 'Shipment Documents', path: ROUTES.GALLERY, icon: ImageIcon },
    { label: 'Transit Timeline', path: ROUTES.TIMELINE, icon: Clock },
    { label: 'Analytics', path: ROUTES.STATISTICS, icon: BarChart3 },
    { label: 'Starred Shipments', path: ROUTES.FAVORITES, icon: Heart },
    { label: 'Profile', path: ROUTES.PROFILE, icon: User },
    { label: 'Settings', path: ROUTES.SETTINGS, icon: SettingsIcon },
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

export default AppSidebar;
