import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Heart, MapPin, Image as ImageIcon, BookOpen, Star } from 'lucide-react';
import { LightboxModal } from '../components/gallery/LightboxModal';

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState({ trips: [], photos: [], memories: [] });
  const [activeTab, setActiveTab] = useState('trips'); // 'trips' | 'photos' | 'memories'
  const [loading, setLoading] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await API.get('/favorites');
      if (res.data.success) {
        setFavorites(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load favorites:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (type, id) => {
    try {
      await API.post('/favorites/toggle', { itemType: type, itemId: id });
      fetchFavorites();
      if (lightboxPhoto && lightboxPhoto._id === id) setLightboxPhoto(null);
    } catch (err) {
      alert(err.message || 'Failed to update favorite');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
          My <span className="gradient-text">Favorites</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
          Your bookmarked trips, favorite photos, and cherished journal entries
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('trips')}
          className={`btn ${activeTab === 'trips' ? 'btn-primary' : 'btn-outline'}`}
        >
          <MapPin size={16} /> Favorite Trips ({favorites.trips.length})
        </button>
        <button
          onClick={() => setActiveTab('photos')}
          className={`btn ${activeTab === 'photos' ? 'btn-primary' : 'btn-outline'}`}
        >
          <ImageIcon size={16} /> Favorite Photos ({favorites.photos.length})
        </button>
        <button
          onClick={() => setActiveTab('memories')}
          className={`btn ${activeTab === 'memories' ? 'btn-primary' : 'btn-outline'}`}
        >
          <BookOpen size={16} /> Favorite Memories ({favorites.memories.length})
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading favorites...</div>
      ) : activeTab === 'trips' ? (
        favorites.trips.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No favorite trips saved yet. Click the heart icon on any trip card to pin it here.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {favorites.trips.map(trip => (
              <div key={trip._id} className="glass-card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{trip.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>📍 {trip.destination}, {trip.country}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{trip.status}</span>
                  <button onClick={() => handleToggleFavorite('trip', trip._id)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}>
                    <Heart size={18} fill="var(--error)" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : activeTab === 'photos' ? (
        favorites.photos.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No favorite photos saved yet.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {favorites.photos.map(photo => (
              <div key={photo._id} className="glass-card" style={{ height: '200px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setLightboxPhoto(photo)}>
                <img src={photo.url} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )
      ) : (
        favorites.memories.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No favorite memories saved yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {favorites.memories.map(mem => (
              <div key={mem._id} className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{mem.title}</h3>
                  <button onClick={() => handleToggleFavorite('memory', mem._id)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}>
                    <Heart size={18} fill="var(--error)" />
                  </button>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{mem.description}</p>
              </div>
            ))}
          </div>
        )
      )}

      <LightboxModal
        photo={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
        onToggleFavorite={(id) => handleToggleFavorite('photo', id)}
        onDelete={() => {}}
      />
    </div>
  );
};
