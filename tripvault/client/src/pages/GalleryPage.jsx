import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Heart, Eye, Trash2, Filter } from 'lucide-react';
import API from '../services/api';
import { PhotoUploadModal } from '../components/gallery/PhotoUploadModal';
import { LightboxModal } from '../components/gallery/LightboxModal';

export const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTrip, setSelectedTrip] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [photosRes, tripsRes] = await Promise.all([
        API.get('/photos', { params: { tripId: selectedTrip, isFavorite: onlyFavorites } }),
        API.get('/trips')
      ]);

      if (photosRes.data.success) setPhotos(photosRes.data.data);
      if (tripsRes.data.success) setTrips(tripsRes.data.data);
    } catch (err) {
      console.error('Failed to load gallery:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTrip, onlyFavorites]);

  const handleToggleFavorite = async (photoId) => {
    try {
      await API.patch(`/photos/${photoId}/favorite`);
      fetchData();
      if (activeLightboxPhoto && activeLightboxPhoto._id === photoId) {
        setActiveLightboxPhoto(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
      }
    } catch (err) {
      alert(err.message || 'Failed to toggle favorite');
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm('Delete this photo from your vault?')) return;
    try {
      await API.delete(`/photos/${photoId}`);
      if (activeLightboxPhoto?._id === photoId) setActiveLightboxPhoto(null);
      fetchData();
    } catch (err) {
      alert(err.message || 'Failed to delete photo');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
            Photo <span className="gradient-text">Gallery</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
            High-resolution visual memories captured from your journeys ({photos.length} Photos)
          </p>
        </div>

        <button onClick={() => setUploadModalOpen(true)} className="btn btn-primary">
          <Upload size={18} /> Upload Photos
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <Filter size={16} /> Filter Gallery:
          </div>

          <select value={selectedTrip} onChange={(e) => setSelectedTrip(e.target.value)} className="form-input no-icon" style={{ width: 'auto' }}>
            <option value="">All Associated Trips</option>
            {trips.map(t => (
              <option key={t._id} value={t._id}>{t.title} ({t.country})</option>
            ))}
          </select>

          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`btn ${onlyFavorites ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <Heart size={16} fill={onlyFavorites ? '#FFF' : 'transparent'} />
            {onlyFavorites ? 'Showing Favorites' : 'Show Favorites Only'}
          </button>
        </div>

        <div style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>
          Showing <strong>{photos.length}</strong> photo(s)
        </div>
      </div>

      {/* Photos Wall Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          Loading photo gallery...
        </div>
      ) : photos.length === 0 ? (
        <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ImageIcon size={48} color="var(--accent)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No photos found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', maxWidth: '400px', marginBottom: '1.5rem' }}>
            Upload high-res trip photos to populate your interactive memory gallery!
          </p>
          <button onClick={() => setUploadModalOpen(true)} className="btn btn-primary">
            <Upload size={18} /> Upload Photos
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {photos.map((photo) => (
            <div
              key={photo._id}
              className="glass-card"
              style={{
                position: 'relative',
                height: '240px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                onClick={() => setActiveLightboxPhoto(photo)}
              />

              {/* Overlay Bar */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 50%)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  opacity: 0.9
                }}
              >
                {/* Favorite badge top */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleFavorite(photo._id); }}
                    style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: photo.isFavorite ? 'var(--error)' : '#FFF',
                      cursor: 'pointer'
                    }}
                  >
                    <Heart size={16} fill={photo.isFavorite ? 'var(--error)' : 'transparent'} />
                  </button>
                </div>

                {/* Bottom caption & view trigger */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFF', display: 'block' }}>
                      {photo.caption || 'Trip Photo'}
                    </span>
                    {photo.trip && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {photo.trip.title}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setActiveLightboxPhoto(photo)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: '0.25rem' }}
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <PhotoUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={fetchData}
        trips={trips}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        photo={activeLightboxPhoto}
        onClose={() => setActiveLightboxPhoto(null)}
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDeletePhoto}
      />
    </div>
  );
};

export default GalleryPage;
