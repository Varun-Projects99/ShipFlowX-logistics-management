import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  BookOpen,
  Image as ImageIcon,
  ShieldCheck,
  BarChart2,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import { useAuth } from '../contexts/AuthContext';
import appConfig from '../config/appConfig';
import { ROUTES } from '../constants/routes';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const brandPart1 = appConfig.appName.slice(0, 4);
  const brandPart2 = appConfig.appName.slice(4);

  const features = [
    {
      icon: BookOpen,
      title: 'Shipment Ledger',
      description: 'Document rich day-by-day status logs of your logistics operations and transit highlights.'
    },
    {
      icon: ImageIcon,
      title: 'Cargo Documents',
      description: 'Organize high-resolution delivery photos and bill of lading documents linked to specific dispatches.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Cloud Vault',
      description: 'Your digital records are encrypted and stored safely with enterprise-grade JWT and MongoDB security.'
    },
    {
      icon: BarChart2,
      title: 'Logistics Analytics',
      description: 'Visualize dispatch performance, visited hub locations, and shipment delivery metrics.'
    },
    {
      icon: Calendar,
      title: 'Transit Timeline',
      description: 'Relive and monitor logistics status changes chronologically through an interactive timeline view.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '5rem 0 4rem',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0) 70%)'
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: 'var(--primary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={16} />
            <span>Enterprise Logistics Dashboard</span>
          </div>

          {/* Logo & Headline */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
            }}>
              <Compass size={36} color="#FFFFFF" />
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px' }}>
              {brandPart1}<span className="gradient-text">{brandPart2}</span>
            </h1>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            marginBottom: '1rem',
            lineHeight: 1.3
          }}>
            Streamline Logistics. <span className="gradient-text-accent">Real-Time Dispatch.</span>
          </h2>

          <p style={{
            maxWidth: '650px',
            margin: '0 auto 2.5rem',
            fontSize: '1.125rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7
          }}>
            Your secure portal for enterprise-grade dispatch management. Real-time routing, cargo photo logs, and automatic status updates in a beautifully unified workspace.
          </p>

          {/* Call to Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            {isAuthenticated ? (
              <Link to={ROUTES.DASHBOARD} className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
                Go to Dashboard
                <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link to={ROUTES.REGISTER} className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
                  Get Started Free
                  <ArrowRight size={18} />
                </Link>
                <Link to={ROUTES.LOGIN} className="btn btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
                  Login to Account
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0 6rem', backgroundColor: 'rgba(15, 23, 42, 0.6)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Designed for Modern Logistics Teams
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '550px', margin: '0 auto' }}>
              Everything you need to track shipments, record transit checkpoints, and visualize operational performance.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
