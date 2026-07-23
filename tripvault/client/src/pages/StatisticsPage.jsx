import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { BarChart3, Globe, Compass, Image as ImageIcon, DollarSign, Award, Calendar, Sparkles } from 'lucide-react';

export const StatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [dashRes, analyticsRes] = await Promise.all([
          API.get('/stats/dashboard'),
          API.get('/stats/analytics')
        ]);
        if (dashRes.data.success) setStats(dashRes.data.data);
        if (analyticsRes.data.success) setAnalytics(analyticsRes.data.data);
      } catch (err) {
        console.error('Failed to load statistics:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading analytics...</div>;
  }

  const travelTypes = analytics?.travelTypeDistribution || {};

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
          Travel <span className="gradient-text">Statistics & Analytics</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
          Deep-dive insights into your lifetime travel history, budgets, and milestones
        </p>
      </div>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Most Visited Country</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{analytics?.mostVisitedCountry || 'None'}</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Est. Distance Covered</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{stats?.distanceTravelled?.toLocaleString() || 0} km</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Travel Budget</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>${stats?.budgetSpent?.toLocaleString() || 0}</div>
          </div>
        </div>
      </div>

      {/* Travel Type Distribution */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Travel Type Distribution
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {Object.entries(travelTypes).map(([type, count]) => {
            const percentage = stats?.totalTrips > 0 ? Math.round((count / stats.totalTrips) * 100) : 0;
            return (
              <div key={type} style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                  <span>{type}</span>
                  <span style={{ color: 'var(--primary)' }}>{count} trip(s)</span>
                </div>
                <div style={{ height: '6px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${percentage}%`, backgroundColor: 'var(--primary)', transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>{percentage}% of total trips</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Longest & Shortest Trips */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Longest Trip */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            <Sparkles size={18} /> Longest Journey
          </div>
          {analytics?.longestTrip ? (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{analytics.longestTrip.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.35rem 0' }}>📍 {analytics.longestTrip.destination}, {analytics.longestTrip.country}</p>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.5rem' }}>
                Duration: {analytics.longestTrip.days} Days
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No trips logged yet to determine longest journey.</p>
          )}
        </div>

        {/* Shortest Trip */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            <Calendar size={18} /> Shortest Getaway
          </div>
          {analytics?.shortestTrip ? (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{analytics.shortestTrip.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.35rem 0' }}>📍 {analytics.shortestTrip.destination}, {analytics.shortestTrip.country}</p>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--warning)', marginTop: '0.5rem' }}>
                Duration: {analytics.shortestTrip.days} Days
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No trips logged yet to determine shortest getaway.</p>
          )}
        </div>
      </div>
    </div>
  );
};
