import React from 'react';
import { Compass, Mail, Shield, ShieldCheck, Heart } from 'lucide-react';
import appConfig from '../config/appConfig';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 1.5rem 2rem 1.5rem',
      color: 'var(--text-muted)',
      fontSize: '0.9rem'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2.5rem',
        marginBottom: '3rem'
      }}>
        {/* Brand Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Compass size={18} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              {appConfig.appName}
            </span>
          </div>
          <p style={{ lineHeight: 1.6, fontSize: '0.85rem' }}>
            {appConfig.appName === 'ShipFlowX'
              ? 'Enterprise Logistics Management & Real-Time Shipment Tracking Platform.'
              : 'Capture Memories. Preserve Adventures. Securely document your travel diaries and photo logs.'}
          </p>
        </div>

        {/* Feature Highlights */}
        <div>
          <h4 style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '1.2rem', fontSize: '1rem' }}>Platform Features</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <li>🔒 Military-Grade Encrypted Vault</li>
            <li>🗺️ Interactive Route Mapping</li>
            <li>📊 High-Fidelity Statistics & Analytics</li>
            <li>⚡ Ultra-Fast Load Times & Exports</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '1.2rem', fontSize: '1rem' }}>Contact & Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} /> {appConfig.supportEmail}
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={16} /> SOC2 Type II Certified
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} /> ISO 27001 Compliant
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bottom */}
      <div style={{
        borderTop: '1px solid var(--border-color)',
        paddingTop: '2rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <p>&copy; {new Date().getFullYear()} {appConfig.companyName}. All rights reserved.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          Built with <Heart size={12} style={{ color: 'var(--error)' }} /> for Week 1 Enterprise-Grade Review
        </p>
      </div>
    </footer>
  );
};

export default Footer;
