import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import API from '../services/api';
import { User, Mail, Globe, Lock, ShieldAlert, CheckCircle2, AlertCircle, Save, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    country: '',
    language: 'English',
    avatarUrl: '',
    instagram: '',
    twitter: '',
    website: '',
    preferredTravelType: 'Adventure'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        country: user.country || 'Global Citizen',
        language: user.language || 'English',
        avatarUrl: user.avatarUrl || '',
        instagram: user.socialLinks?.instagram || '',
        twitter: user.socialLinks?.twitter || '',
        website: user.socialLinks?.website || '',
        preferredTravelType: user.travelPreferences?.preferredTravelType || 'Adventure'
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setUpdating(true);

    try {
      const res = await API.put('/user/profile', {
        name: profileData.name,
        bio: profileData.bio,
        country: profileData.country,
        language: profileData.language,
        avatarUrl: profileData.avatarUrl,
        socialLinks: {
          instagram: profileData.instagram,
          twitter: profileData.twitter,
          website: profileData.website
        },
        travelPreferences: {
          preferredTravelType: profileData.preferredTravelType
        }
      });

      if (res.data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    try {
      const res = await API.put('/user/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (res.data.success) {
        setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      }
    } catch (err) {
      setPasswordMessage({ type: 'error', text: err.message || 'Failed to change password' });
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.prompt('WARNING: This will permanently delete your account and ALL travel data! Type "DELETE" to confirm:');
    if (confirmation !== 'DELETE') return;

    try {
      await API.delete('/user/account');
      logout();
      navigate('/login');
    } catch (err) {
      alert(err.message || 'Failed to delete account');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
          User <span className="gradient-text">Profile</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
          Manage your personal details, travel preferences, and account security
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleProfileSubmit} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          Personal Information
        </h3>

        {message.text && (
          <div className={`alert alert-${message.type === 'success' ? 'success' : 'error'}`}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="form-input no-icon"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Email Address (Read-only)</label>
            <input
              type="email"
              value={profileData.email}
              disabled
              className="form-input no-icon"
              style={{ opacity: 0.6 }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Home Country</label>
            <input
              type="text"
              value={profileData.country}
              onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
              className="form-input no-icon"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Language</label>
            <input
              type="text"
              value={profileData.language}
              onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
              className="form-input no-icon"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Preferred Travel Type</label>
            <select
              value={profileData.preferredTravelType}
              onChange={(e) => setProfileData({ ...profileData, preferredTravelType: e.target.value })}
              className="form-input no-icon"
            >
              <option value="Adventure">Adventure</option>
              <option value="Solo">Solo</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Business">Business</option>
            </select>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Avatar Image URL</label>
          <input
            type="url"
            value={profileData.avatarUrl}
            onChange={(e) => setProfileData({ ...profileData, avatarUrl: e.target.value })}
            placeholder="https://example.com/avatar.jpg"
            className="form-input no-icon"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Bio & Traveler Intro</label>
          <textarea
            rows={3}
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            className="form-input no-icon"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button type="submit" disabled={updating} className="btn btn-primary">
            <Save size={16} /> Save Profile Changes
          </button>
        </div>
      </form>

      {/* Change Password */}
      <form onSubmit={handlePasswordSubmit} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          Security & Password
        </h3>

        {passwordMessage.text && (
          <div className={`alert alert-${passwordMessage.type === 'success' ? 'success' : 'error'}`}>
            {passwordMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{passwordMessage.text}</span>
          </div>
        )}

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Current Password</label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            className="form-input no-icon"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="form-input no-icon"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmNewPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
              className="form-input no-icon"
              required
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button type="submit" className="btn btn-secondary">
            Update Password
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="glass-card" style={{ padding: '2rem', borderColor: 'rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--error)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={20} /> Danger Zone
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          Permanently delete your user account and erase all associated travel journals, photos, memories, and stats.
        </p>
        <button onClick={handleDeleteAccount} className="btn" style={{ backgroundColor: 'var(--error)', color: '#FFF' }}>
          <Trash2 size={16} /> Delete Account Permanently
        </button>
      </div>
    </div>
  );
};
