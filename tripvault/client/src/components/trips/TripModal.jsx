import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';

export const TripModal = ({ isOpen, onClose, onSave, tripToEdit = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    country: '',
    city: '',
    coverImage: '',
    description: '',
    travelType: 'Adventure',
    startDate: '',
    endDate: '',
    budget: '',
    currency: 'USD',
    status: 'Upcoming',
    transportation: 'Flight',
    tags: '',
    lat: '20.5937',
    lng: '78.9629'
  });

  useEffect(() => {
    if (tripToEdit) {
      setFormData({
        title: tripToEdit.title || '',
        destination: tripToEdit.destination || '',
        country: tripToEdit.country || '',
        city: tripToEdit.city || '',
        coverImage: tripToEdit.coverImage || '',
        description: tripToEdit.description || '',
        travelType: tripToEdit.travelType || 'Adventure',
        startDate: tripToEdit.startDate ? new Date(tripToEdit.startDate).toISOString().split('T')[0] : '',
        endDate: tripToEdit.endDate ? new Date(tripToEdit.endDate).toISOString().split('T')[0] : '',
        budget: tripToEdit.budget || '',
        currency: tripToEdit.currency || 'USD',
        status: tripToEdit.status || 'Upcoming',
        transportation: tripToEdit.transportation || 'Flight',
        tags: Array.isArray(tripToEdit.tags) ? tripToEdit.tags.join(', ') : '',
        lat: tripToEdit.coordinates?.lat || '20.5937',
        lng: tripToEdit.coordinates?.lng || '78.9629'
      });
    } else {
      setFormData({
        title: '',
        destination: '',
        country: '',
        city: '',
        coverImage: '',
        description: '',
        travelType: 'Adventure',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        budget: '1500',
        currency: 'USD',
        status: 'Upcoming',
        transportation: 'Flight',
        tags: 'Summer, Vacation, Relax',
        lat: '20.5937',
        lng: '78.9629'
      });
    }
  }, [tripToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      coordinates: {
        lat: parseFloat(formData.lat) || 20.5937,
        lng: parseFloat(formData.lng) || 78.9629
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tripToEdit ? 'Edit Trip Details' : 'Create New Trip'}
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {/* Title */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Trip Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Summer Vacation in Bali"
            className="form-input no-icon"
            required
          />
        </div>

        {/* Destination, Country & City */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Destination City/Spot *</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g. Ubud"
              className="form-input no-icon"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Country *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="e.g. Indonesia"
              className="form-input no-icon"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Denpasar"
              className="form-input no-icon"
            />
          </div>
        </div>

        {/* Travel Type, Status & Transport Mode */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Travel Type</label>
            <select name="travelType" value={formData.travelType} onChange={handleChange} className="form-input no-icon">
              <option value="Solo">Solo</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Business">Business</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Trip Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="form-input no-icon">
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Transportation Mode</label>
            <select name="transportation" value={formData.transportation} onChange={handleChange} className="form-input no-icon">
              <option value="Flight">Flight ✈️</option>
              <option value="Train">Train 🚆</option>
              <option value="Bus">Bus 🚌</option>
              <option value="Car">Car 🚗</option>
              <option value="Bike">Bike 🚲</option>
              <option value="Walking">Walking 🚶</option>
            </select>
          </div>
        </div>

        {/* Dates & Cost */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="form-input no-icon"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">End Date *</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="form-input no-icon"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="1500"
              className="form-input no-icon"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Currency</label>
            <select name="currency" value={formData.currency} onChange={handleChange} className="form-input no-icon">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>

        {/* Cover Image URL */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Cover Image URL</label>
          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            className="form-input no-icon"
          />
        </div>

        {/* Description */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Trip Description & Plan</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Write notes about your planned routes, sights to see, and memory highlights..."
            className="form-input no-icon"
            style={{ resize: 'vertical' }}
          />
        </div>

        {/* Tags */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="beach, summer, retreat"
            className="form-input no-icon"
          />
        </div>

        {/* Submit Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {tripToEdit ? 'Save Changes' : 'Create Trip'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TripModal;
