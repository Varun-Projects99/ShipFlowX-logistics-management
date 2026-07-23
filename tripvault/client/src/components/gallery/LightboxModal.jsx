import React from 'react';
import ReactDOM from 'react-dom';
import { X, Heart, Trash2, MapPin, Calendar } from 'lucide-react';

export const LightboxModal = ({ photo, onClose, onToggleFavorite, onDelete }) => {
  if (!photo) return null;

  const content = (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      boxSizing: 'border-box'
    }}>
      {/* Top Controls */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        zIndex: 10
      }}>
        <button
          onClick={() => onToggleFavorite(photo._id)}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: photo.isFavorite ? 'var(--error)' : '#FFF',
            cursor: 'pointer'
          }}
          title={photo.isFavorite ? 'Favorited' : 'Add to Favorites'}
        >
          <Heart size={20} fill={photo.isFavorite ? 'var(--error)' : 'transparent'} />
        </button>

        <button
          onClick={() => onDelete(photo._id)}
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FCA5A5',
            cursor: 'pointer'
          }}
          title="Delete Photo"
        >
          <Trash2 size={20} />
        </button>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Image View */}
      <div style={{ maxWidth: '90vw', maxHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={photo.url}
          alt={photo.caption || 'Travel Memory'}
          style={{
            maxWidth: '100%',
            maxHeight: '75vh',
            objectFit: 'contain',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)'
          }}
        />
      </div>

      {/* Photo Info Bar */}
      <div style={{ marginTop: '1.5rem', textAlign: 'center', maxWidth: '600px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          {photo.caption || 'Untitled Travel Photo'}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {photo.trip && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={16} color="var(--primary)" /> {photo.trip.title || 'Associated Trip'}
            </span>
          )}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={16} color="var(--accent)" /> {new Date(photo.createdAt || Date.now()).toLocaleDateString()}
          </span>
          <span>💾 {photo.size || '1.2 MB'}</span>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};
