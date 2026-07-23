import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Star } from 'lucide-react';

export const MemoryModal = ({ isOpen, onClose, onSave, trips = [], memoryToEdit = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    mood: 'Happy',
    weather: 'Sunny',
    rating: 5,
    trip: '',
    tags: '',
    photoUrl: ''
  });

  useEffect(() => {
    if (memoryToEdit) {
      setFormData({
        title: memoryToEdit.title || '',
        description: memoryToEdit.description || '',
        date: memoryToEdit.date ? new Date(memoryToEdit.date).toISOString().split('T')[0] : '',
        location: memoryToEdit.location || '',
        mood: memoryToEdit.mood || 'Happy',
        weather: memoryToEdit.weather || 'Sunny',
        rating: memoryToEdit.rating || 5,
        trip: memoryToEdit.trip?._id || memoryToEdit.trip || '',
        tags: Array.isArray(memoryToEdit.tags) ? memoryToEdit.tags.join(', ') : '',
        photoUrl: Array.isArray(memoryToEdit.photos) && memoryToEdit.photos.length > 0 ? memoryToEdit.photos[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
        mood: 'Happy',
        weather: 'Sunny',
        rating: 5,
        trip: trips.length > 0 ? trips[0]._id : '',
        tags: 'Journal, Highlight',
        photoUrl: ''
      });
    }
  }, [memoryToEdit, isOpen, trips]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      photos: formData.photoUrl ? [formData.photoUrl] : []
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={memoryToEdit ? 'Edit Memory Entry' : 'Log New Travel Memory'}
      maxWidth="640px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {/* Title & Trip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Memory Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Sunset over Fushimi Inari"
              className="form-input no-icon"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Associated Trip</label>
            <select name="trip" value={formData.trip} onChange={handleChange} className="form-input no-icon">
              <option value="">Standalone / Unlinked</option>
              {trips.map(t => (
                <option key={t._id} value={t._id}>{t.title} ({t.country})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date, Location, Mood, Weather */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.85rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input no-icon"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Kyoto, Japan"
              className="form-input no-icon"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Mood</label>
            <select name="mood" value={formData.mood} onChange={handleChange} className="form-input no-icon">
              <option value="Happy">Happy 😊</option>
              <option value="Inspired">Inspired 💡</option>
              <option value="Relaxed">Relaxed 😌</option>
              <option value="Adventurous">Adventurous ⛰️</option>
              <option value="Romantic">Romantic ❤️</option>
              <option value="Nostalgic">Nostalgic 🌅</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Weather</label>
            <select name="weather" value={formData.weather} onChange={handleChange} className="form-input no-icon">
              <option value="Sunny">Sunny ☀️</option>
              <option value="Cloudy">Cloudy ⛅</option>
              <option value="Rainy">Rainy 🌧️</option>
              <option value="Snowy">Snowy ❄️</option>
              <option value="Windy">Windy 🌬️</option>
              <option value="Clear">Clear 🌙</option>
            </select>
          </div>
        </div>

        {/* Rating Star Selection */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Experience Rating</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: star <= formData.rating ? 'var(--warning)' : 'var(--text-dim)'
                }}
              >
                <Star size={24} fill={star <= formData.rating ? 'var(--warning)' : 'transparent'} />
              </button>
            ))}
          </div>
        </div>

        {/* Description Rich Content */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Journal Story & Reflections *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Write your day's journey, feelings, places visited, and memorable moments..."
            className="form-input no-icon"
            style={{ resize: 'vertical' }}
            required
          />
        </div>

        {/* Photo URL & Tags */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Photo Image URL</label>
            <input
              type="url"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="form-input no-icon"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Sunset, Shrine, Matcha"
              className="form-input no-icon"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {memoryToEdit ? 'Save Memory' : 'Publish Memory'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
