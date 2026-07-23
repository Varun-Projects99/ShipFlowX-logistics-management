import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { UploadCloud, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import API from '../../services/api';

export const PhotoUploadModal = ({ isOpen, onClose, onUploadSuccess, trips = [] }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [tripId, setTripId] = useState('');
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setSelectedFiles(prev => [...prev, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFiles.length) {
      setError('Please select at least one photo to upload');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      if (tripId) formData.append('tripId', tripId);
      if (caption) formData.append('caption', caption);

      selectedFiles.forEach(file => {
        formData.append('photos', file);
      });

      const res = await API.post('/photos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setSelectedFiles([]);
        setPreviews([]);
        setCaption('');
        onUploadSuccess();
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Failed to upload photos');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Travel Photos" maxWidth="600px">
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Association */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Associate with Trip (Optional)</label>
          <select value={tripId} onChange={(e) => setTripId(e.target.value)} className="form-input no-icon">
            <option value="">Standalone Gallery Upload</option>
            {trips.map(t => (
              <option key={t._id} value={t._id}>{t.title} ({t.country})</option>
            ))}
          </select>
        </div>

        {/* Caption */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Caption / Description</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g. Scenery captured during our morning trek"
            className="form-input no-icon"
          />
        </div>

        {/* Drag and Drop File Upload Container */}
        <div
          style={{
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer'
            }}
          />
          <UploadCloud size={40} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Drag & Drop photos here, or click to browse
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
            Supports JPG, PNG, WEBP (Max 10MB per file)
          </p>
        </div>

        {/* Previews */}
        {previews.length > 0 && (
          <div>
            <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
              Selected Photos ({previews.length})
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.75rem' }}>
              {previews.map((src, i) => (
                <div key={i} style={{ position: 'relative', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src={src} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(i)}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: 'rgba(0,0,0,0.7)',
                      border: 'none',
                      color: '#FFF',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
          <button type="submit" disabled={uploading || !selectedFiles.length} className="btn btn-primary">
            {uploading ? 'Uploading Media...' : `Upload ${selectedFiles.length} Photo(s)`}
          </button>
        </div>
      </form>
    </Modal>
  );
};
