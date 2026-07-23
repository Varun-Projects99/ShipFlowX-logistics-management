import React, { useState } from 'react';
import API from '../services/api';
import { Settings, Download, Trash2, Shield, Bell, Moon, Globe, RefreshCw, CheckCircle2 } from 'lucide-react';

const ToggleSwitch = ({ checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    style={{
      width: '48px',
      height: '26px',
      borderRadius: '999px',
      backgroundColor: checked ? 'var(--primary)' : 'rgba(255, 255, 255, 0.15)',
      padding: '3px',
      cursor: 'pointer',
      transition: 'background-color 0.25s ease',
      display: 'flex',
      alignItems: 'center',
      boxShadow: checked ? '0 0 12px rgba(59, 130, 246, 0.4)' : 'none'
    }}
  >
    <div
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        transform: checked ? 'translateX(22px)' : 'translateX(0px)',
        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
      }}
    />
  </div>
);

export const SettingsPage = () => {
  const [notifications, setNotifications] = useState({ emailAlerts: true, tripReminders: true });
  const [privacy, setPrivacy] = useState({ privateVault: true, publicProfile: false });
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState('');

  const handleExportData = async () => {
    setExporting(true);
    try {
      const res = await API.post('/user/export-data');
      if (res.data.success) {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(res.data.data, null, 2))}`;
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', jsonString);
        downloadAnchor.setAttribute('download', `TripVault_Backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        setMessage('Your TripVault data backup JSON has been exported successfully!');
      }
    } catch (err) {
      alert(err.message || 'Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  const handleClearAllData = async () => {
    const confirmText = window.prompt('Type "CLEAR ALL" to wipe all your trips, photos, and memories while keeping your account active:');
    if (confirmText !== 'CLEAR ALL') return;

    try {
      await API.delete('/user/data');
      setMessage('All travel data has been cleared from your account.');
    } catch (err) {
      alert(err.message || 'Failed to clear data');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
          Application <span className="gradient-text">Settings</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
          Configure system preferences, notifications, data backups, and vault privacy
        </p>
      </div>

      {message && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>{message}</span>
        </div>
      )}

      {/* Export & Data Backup */}
      <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={20} color="var(--primary)" /> Data Export & Backup
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Download a complete JSON export of all your travel itineraries, photos, journal entries, and statistics.
        </p>
        <div>
          <button onClick={handleExportData} disabled={exporting} className="btn btn-primary">
            <Download size={16} /> {exporting ? 'Generating JSON...' : 'Export Vault Data (JSON)'}
          </button>
        </div>
      </div>

      {/* Notifications Settings */}
      <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={20} color="var(--accent)" /> Notifications & Reminders
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Email Trip Reminders</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Receive notifications before upcoming trip start dates</div>
            </div>
            <ToggleSwitch
              checked={notifications.tripReminders}
              onChange={(val) => setNotifications({ ...notifications, tripReminders: val })}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Security & Login Alerts</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Get notified on new logins from unrecognized devices</div>
            </div>
            <ToggleSwitch
              checked={notifications.emailAlerts}
              onChange={(val) => setNotifications({ ...notifications, emailAlerts: val })}
            />
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={20} color="var(--success)" /> Privacy & Security
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Private Vault Mode</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Only authenticated account owner can view stored memories and photos</div>
          </div>
          <ToggleSwitch
            checked={privacy.privateVault}
            onChange={(val) => setPrivacy({ ...privacy, privateVault: val })}
          />
        </div>
      </div>

      {/* Data Cleanup */}
      <div className="glass-card" style={{ padding: '2rem', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--error)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Trash2 size={20} /> Reset Travel Vault Data
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          Clear all trips, photos, and memories while maintaining your active account.
        </p>
        <button onClick={handleClearAllData} className="btn" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <Trash2 size={16} /> Reset All Vault Data
        </button>
      </div>
    </div>
  );
};
