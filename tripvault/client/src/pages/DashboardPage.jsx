import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import API from '../services/api';
import {
  MapPin,
  BookOpen,
  Image as ImageIcon,
  Globe,
  PlusCircle,
  Upload,
  Eye,
  Sparkles,
  Clock,
  ArrowUpRight,
  DollarSign,
  Compass,
  CheckCircle2,
  Calendar
} from 'lucide-react';

import { TripModal } from '../components/trips/TripModal';
import { MemoryModal } from '../components/memories/MemoryModal';
import { PhotoUploadModal } from '../components/gallery/PhotoUploadModal';
import { InteractiveTravelMap } from '../components/common/InteractiveTravelMap';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state for Quick Actions
  const [tripModalOpen, setTripModalOpen] = useState(false);
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, tripsRes] = await Promise.all([
        API.get('/stats/dashboard'),
        API.get('/trips')
      ]);

      if (statsRes.data.success) setStats(statsRes.data.data);
      if (tripsRes.data.success) setTrips(tripsRes.data.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCreateTrip = async (tripData) => {
    try {
      await API.post('/trips', tripData);
      setTripModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      alert(err.message || 'Error booking shipment');
    }
  };

  const handleCreateMemory = async (memoryData) => {
    try {
      await API.post('/memories', memoryData);
      setMemoryModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      alert(err.message || 'Error adding shipment record');
    }
  };

  const userName = user?.name || 'Operator';

  const statCards = [
    { label: 'Active Shipments', value: stats?.totalTrips || 0, icon: MapPin, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.12)' },
    { label: 'Delivered Shipments', value: stats?.totalCountries || 0, icon: Globe, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' },
    { label: 'In Transit', value: stats?.totalCities || 0, icon: Compass, color: '#818CF8', bg: 'rgba(129, 140, 248, 0.12)' },
    { label: 'Pending Deliveries', value: stats?.totalPhotos || 0, icon: ImageIcon, color: '#22C55E', bg: 'rgba(34, 197, 94, 0.12)' },
    { label: 'Cancelled Shipments', value: stats?.totalMemories || 0, icon: BookOpen, color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.12)' },
    { label: 'Total Freight Cost', value: `$${stats?.budgetSpent || 0}`, icon: DollarSign, color: '#EC4899', bg: 'rgba(236, 72, 153, 0.12)' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Hero Banner */}
      <div className="glass-card" style={{
        padding: '2.5rem',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
        position: 'relative',
        overflow: 'hidden',
        borderColor: 'rgba(59, 130, 246, 0.25)'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Sparkles size={16} />
            <span>Enterprise Logistics Intelligence Center</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
            Welcome, <span className="gradient-text">{userName}</span>! 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '650px', lineHeight: 1.6 }}>
            Manage shipments, monitor deliveries, analyze logistics performance and oversee transportation operations from a centralized enterprise dashboard.
          </p>
        </div>
      </div>

      {/* Dynamic Statistics Grid */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Shipment Analytics Dashboard
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{card.label}</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
                  {card.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Travel Map Section */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Global Shipment Tracking Map
        </h2>
        <InteractiveTravelMap trips={trips} height="320px" />
      </div>

      {/* Two Column Layout: Quick Actions & Recent Activity Stream */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
        {/* Working Quick Actions */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
            Shipment Operations
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              className="glass-card"
              onClick={() => setTripModalOpen(true)}
              style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PlusCircle size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>Book Shipment</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Register a new freight dispatch record</div>
                </div>
              </div>
              <ArrowUpRight size={18} style={{ color: 'var(--text-dim)' }} />
            </div>

            <div
              className="glass-card"
              onClick={() => setPhotoModalOpen(true)}
              style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Upload size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>Upload Shipment Documents</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Attach invoices, receipts, and lading docs</div>
                </div>
              </div>
              <ArrowUpRight size={18} style={{ color: 'var(--text-dim)' }} />
            </div>

            <div
              className="glass-card"
              onClick={() => setMemoryModalOpen(true)}
              style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Eye size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>Log Shipment Record</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Update cargo transit updates & checkpoints</div>
                </div>
              </div>
              <ArrowUpRight size={18} style={{ color: 'var(--text-dim)' }} />
            </div>
          </div>
        </div>

        {/* Dynamic Activity Stream */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
            Shipment Activity Feed
          </h2>
          <div className="glass-card" style={{ padding: '1.25rem', minHeight: '260px' }}>
            {!stats?.activities || stats.activities.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                <Clock size={32} style={{ marginBottom: '0.5rem', color: 'var(--text-dim)' }} />
                <p style={{ fontSize: '0.925rem' }}>No shipment logs or activities recorded yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {stats.activities.map((act) => {
                  // Map travel terms in activities to logistics terms dynamically
                  let displayTitle = act.title
                    .replace(/Trip Created/g, 'Shipment Created')
                    .replace(/Trip Edited/g, 'Shipment Updated')
                    .replace(/Trip Deleted/g, 'Shipment Removed')
                    .replace(/Photo Uploaded/g, 'Document Attached')
                    .replace(/Memory Added/g, 'Log Record Added');
                  
                  return (
                    <div key={act._id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary)', marginTop: '6px' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                          {displayTitle}
                        </div>
                        {act.details && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{act.details.replace(/trip/gi, 'shipment')}</div>}
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                          {new Date(act.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action Modals */}
      <TripModal isOpen={tripModalOpen} onClose={() => setTripModalOpen(false)} onSave={handleCreateTrip} />
      <MemoryModal isOpen={memoryModalOpen} onClose={() => setMemoryModalOpen(false)} onSave={handleCreateMemory} trips={trips} />
      <PhotoUploadModal isOpen={photoModalOpen} onClose={() => setPhotoModalOpen(false)} onUploadSuccess={fetchDashboardData} trips={trips} />
    </div>
  );
};

export default DashboardPage;
