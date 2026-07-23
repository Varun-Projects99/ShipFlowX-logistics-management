import React, { useState } from 'react';
import { Modal } from './Modal';
import { Mail, Lock, KeyRound, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import API from '../../services/api';

export const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Email Input, 2: Reset Form
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [userEnteredCode, setUserEnteredCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await API.post('/auth/forgot-password', { email });
      if (res.data.success) {
        setResetCode(res.data.resetCode || '123456');
        setMessage({ type: 'success', text: res.data.message });
        setStep(2);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to generate reset request' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await API.post('/auth/reset-password', { email, newPassword });
      if (res.data.success) {
        setMessage({ type: 'success', text: res.data.message });
        setTimeout(() => {
          onClose();
          setStep(1);
          setEmail('');
          setNewPassword('');
          setMessage({ type: '', text: '' });
        }, 2000);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to reset password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reset Account Password" maxWidth="440px">
      {message.text && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'error'}`}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleRequestCode} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Enter your account email address below to receive password recovery instructions and a security token.
          </p>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="forgot-email">Email Address</label>
            <div className="form-input-wrapper">
              <Mail className="form-input-icon" size={18} />
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="form-input"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-full"
            style={{ padding: '0.85rem' }}
          >
            {loading ? 'Sending Request...' : 'Send Reset Instructions'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Security Reset Code</label>
            <div className="form-input-wrapper">
              <KeyRound className="form-input-icon" size={18} />
              <input
                type="text"
                value={userEnteredCode}
                onChange={(e) => setUserEnteredCode(e.target.value)}
                placeholder={`Enter code (e.g. ${resetCode})`}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">New Password</label>
            <div className="form-input-wrapper">
              <Lock className="form-input-icon" size={18} />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="form-input"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-full"
            style={{ padding: '0.85rem' }}
          >
            {loading ? 'Updating Password...' : 'Reset Password & Login'}
          </button>
        </form>
      )}
    </Modal>
  );
};
