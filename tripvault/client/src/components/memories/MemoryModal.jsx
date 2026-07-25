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
        tags: 'Transit, Checkpoint',
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
      title={memoryToEdit ? 'Edit Shipment Log Entry' : 'Log New Shipment Event'}
      maxWidth="640px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {/* Title & Trip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Event Title / Checkpoint Name *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Arrived at Customs Clearance Hub"
              className="form-input no-icon"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Associated Shipment</label>
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
            <label className="form-label">Hub / Location Address</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Rotterdam Hub 4, Netherlands"
              className="form-input no-icon"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Dispatch Status</label>
            <select name="mood" value={formData.mood} onChange={handleChange} className="form-input no-icon">
              <option value="Happy">Excellent 😊</option>
              <option value="Inspired">On Schedule 💡</option>
              <option value="Relaxed">Normal 😌</option>
              <option value="Adventurous">Customs Check ⛰️</option>
              <option value="Romantic">Priority ❤️</option>
              <option value="Nostalgic">Delayed 🌅</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Route Condition</label>
            <select name="weather" value={formData.weather} onChange={handleChange} className="form-input no-icon">
              <option value="Sunny">Clear ☀️</option>
              <option value="Cloudy">Moderate Fog ⛅</option>
              <option value="Rainy">Rain / Storm 🌧️</option>
              <option value="Snowy">Ice / Blizzard ❄️</option>
              <option value="Windy">High Winds 🌬️</option>
              <option value="Clear">Normal Night 🌙</option>
            </select>
          </div>
        </div>

        {/* Rating Star Selection */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Route Delivery Rating</label>
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
          <label className="form-label">Event Log & Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Write shipment checkpoint details, delay descriptions, handler logs, or container seal verification..."
            className="form-input no-icon"
            style={{ resize: 'vertical' }}
            required
          />
        </div>

        {/* Photo URL & Tags */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Document Attachment URL</label>
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
              placeholder="Lading, Customs, Transit"
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
            {memoryToEdit ? 'Save Event Log' : 'Publish Event Log'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MemoryModal;
