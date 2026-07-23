import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Compass } from 'lucide-react';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-main)'
      }}>
        <Compass className="animate-spin" size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Loading TripVault...</p>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
