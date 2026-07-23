import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Construction } from 'lucide-react';

const moduleInfo = {
  '/trips': {
    title: 'My Trips Management',
    description: 'Create, update, and organize your trip itineraries, destinations, and logs.',
    week: 'Week 2'
  },
  '/gallery': {
    title: 'Photo Memories Gallery',
    description: 'High-resolution photo vault with Cloudinary media integration and tag filtering.',
    week: 'Week 2'
  },
  '/timeline': {
    title: 'Travel Timeline',
    description: 'Chronological timeline visualization of your lifelong adventures and journeys.',
    week: 'Week 3'
  },
  '/statistics': {
    title: 'Trip Analytics & Maps',
    description: 'Interactive country maps, distance calculators, and travel statistics.',
    week: 'Week 3'
  },
  '/favorites': {
    title: 'Favorite Journeys',
    description: 'Quick access to your most cherished travel memories and pinned photos.',
    week: 'Week 2'
  },
  '/profile': {
    title: 'User Profile & Bio',
    description: 'Manage your avatar, bio, travel preferences, and account security.',
    week: 'Week 2'
  },
  '/settings': {
    title: 'Application Settings',
    description: 'Customize dark mode aesthetics, notifications, and export options.',
    week: 'Week 2'
  }
};

export const PlaceholderPage = () => {
  const location = useLocation();
  const info = moduleInfo[location.pathname] || {
    title: 'Module Under Construction',
    description: 'This feature will be released in an upcoming update.',
    week: 'Future Scope'
  };

  return (
    <div className="animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem 1rem'
    }}>
      <div className="glass-card" style={{
        padding: '3rem 2rem',
        maxWidth: '520px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          backgroundColor: 'rgba(59, 130, 246, 0.12)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <Construction size={32} />
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          color: 'var(--accent)',
          fontSize: '0.8rem',
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          <Sparkles size={14} />
          <span>Scheduled for {info.week}</span>
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
          {info.title}
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          {info.description} Architecture for this component is future-ready and set up in Week 1.
        </p>

        <Link to="/dashboard" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};
