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
        tags: 'Fragile, High-Value',
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
      title={tripToEdit ? 'Edit Shipment Details' : 'Book New Shipment'}
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {/* Title */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Shipment ID / Name *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Freight Shipment SFX-8809"
            className="form-input no-icon"
            required
          />
        </div>

        {/* Destination, Country & City */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Destination Address *</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g. Port of Rotterdam"
              className="form-input no-icon"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Region / Country *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="e.g. Netherlands"
              className="form-input no-icon"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">City Hub</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Rotterdam"
              className="form-input no-icon"
            />
          </div>
        </div>

        {/* Cargo Type, Status & Transport Mode */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Cargo Type</label>
            <select name="travelType" value={formData.travelType} onChange={handleChange} className="form-input no-icon">
              <option value="Solo">Express / Critical</option>
              <option value="Family">Dry Cargo</option>
              <option value="Friends">Bulk Freight</option>
              <option value="Business">Cold Chain / Temp-Controlled</option>
              <option value="Adventure">Hazardous Materials</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Shipment Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="form-input no-icon">
              <option value="Upcoming">Booked / Pending</option>
              <option value="Ongoing">In Transit</option>
              <option value="Completed">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Transport Mode</label>
            <select name="transportation" value={formData.transportation} onChange={handleChange} className="form-input no-icon">
              <option value="Flight">Air Freight ✈️</option>
              <option value="Train">Rail Freight 🚆</option>
              <option value="Bus">Road / LTL 🚌</option>
              <option value="Car">Road / FTL 🚗</option>
              <option value="Bike">Courier Delivery 🚲</option>
              <option value="Walking">Last-Mile Distribution 🚶</option>
            </select>
          </div>
        </div>

        {/* Dates & Cost */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Departure Date *</label>
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
            <label className="form-label">Est. Delivery Date *</label>
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
            <label className="form-label">Shipping Cost</label>
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

        {/* Lading/Doc Image URL */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Document Image / Lading Attachment URL</label>
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
          <label className="form-label">Shipment Notes & Manifest</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Write cargo manifest details, delivery instructions, and gate pass notes..."
            className="form-input no-icon"
            style={{ resize: 'vertical' }}
          />
        </div>

        {/* Tags */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Tracking Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Fragile, Palletized, High-Value"
            className="form-input no-icon"
          />
        </div>

        {/* Submit Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {tripToEdit ? 'Save Changes' : 'Book Shipment'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TripModal;
