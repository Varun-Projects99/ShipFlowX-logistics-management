import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Plus,
  Search,
  Filter,
  Copy,
  Archive,
  Trash2,
  Edit,
  Calendar,
  DollarSign,
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
  Heart
} from 'lucide-react';
import API from '../services/api';
import { TripModal } from '../components/trips/TripModal';
import { InteractiveTravelMap } from '../components/common/InteractiveTravelMap';

export const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showArchived, setShowArchived] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const params = {
        archived: showArchived,
        status: statusFilter,
        travelType: typeFilter,
        search
      };
      const res = await API.get('/trips', { params });
      if (res.data.success) {
        setTrips(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch trips:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [statusFilter, typeFilter, showArchived, search]);

  const handleSaveTrip = async (tripData) => {
    try {
      if (selectedTrip) {
        await API.put(`/trips/${selectedTrip._id}`, tripData);
      } else {
        await API.post('/trips', tripData);
      }
      setModalOpen(false);
      setSelectedTrip(null);
      fetchTrips();
    } catch (err) {
      alert(err.message || 'Error saving trip');
    }
  };

  const handleDeleteTrip = async (id) => {
    if (!window.confirm('Are you sure you want to delete this trip journal?')) return;
    try {
      await API.delete(`/trips/${id}`);
      fetchTrips();
    } catch (err) {
      alert(err.message || 'Failed to delete trip');
    }
  };

  const handleDuplicateTrip = async (id) => {
    try {
      await API.post(`/trips/${id}/duplicate`);
      fetchTrips();
    } catch (err) {
      alert(err.message || 'Failed to duplicate trip');
    }
  };

  const handleToggleArchive = async (id) => {
    try {
      await API.patch(`/trips/${id}/archive`);
      fetchTrips();
    } catch (err) {
      alert(err.message || 'Failed to update archive status');
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await API.post('/favorites/toggle', { itemType: 'trip', itemId: id });
      fetchTrips();
    } catch (err) {
      alert(err.message || 'Failed to toggle favorite');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
            My <span className="gradient-text">Trips</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
            Manage, plan, and organize your worldwide travel adventures
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => setShowMap(!showMap)}
            className="btn btn-secondary"
          >
            <Compass size={18} />
            {showMap ? 'Hide Map' : 'View Travel Map'}
          </button>
          <button
            onClick={() => { setSelectedTrip(null); setModalOpen(true); }}
            className="btn btn-primary"
          >
            <Plus size={18} />
            Create Trip
          </button>
        </div>
      </div>

      {/* Map View Drawer */}
      {showMap && (
        <div style={{ marginBottom: '1rem' }}>
          <InteractiveTravelMap trips={trips} height="360px" />
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Search */}
        <div style={{ position: 'relative', minWidth: '240px', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search trips by destination, country, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
          />
        </div>

        {/* Status Dropdown */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <Filter size={16} /> Filter:
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-input no-icon" style={{ width: 'auto' }}>
            <option value="All">All Statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="form-input no-icon" style={{ width: 'auto' }}>
            <option value="All">All Travel Types</option>
            <option value="Solo">Solo</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Business">Business</option>
            <option value="Adventure">Adventure</option>
          </select>

          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`btn ${showArchived ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <Archive size={16} />
            {showArchived ? 'Showing Archived' : 'Show Archived'}
          </button>
        </div>
      </div>

      {/* Trip Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          Loading your travel vault...
        </div>
      ) : trips.length === 0 ? (
        <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Compass size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No trips found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', maxWidth: '400px', marginBottom: '1.5rem' }}>
            {search || statusFilter !== 'All' ? 'Try adjusting your search filters.' : 'Start your journey by creating your first travel journal!'}
          </p>
          <button onClick={() => { setSelectedTrip(null); setModalOpen(true); }} className="btn btn-primary">
            <Plus size={18} /> Create New Trip
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {trips.map((trip) => {
            const statusColor =
              trip.status === 'Completed' ? 'var(--success)' :
              trip.status === 'Ongoing' ? 'var(--accent)' :
              trip.status === 'Cancelled' ? 'var(--error)' : 'var(--primary)';

            return (
              <div key={trip._id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Cover Image & Badges */}
                <div style={{ position: 'relative', height: '180px' }}>
                  <img
                    src={trip.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                    alt={trip.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 60%)' }} />

                  {/* Favorite Button */}
                  <button
                    onClick={() => handleToggleFavorite(trip._id)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: trip.isFavorite ? 'var(--error)' : '#FFF',
                      cursor: 'pointer'
                    }}
                  >
                    <Heart size={16} fill={trip.isFavorite ? 'var(--error)' : 'transparent'} />
                  </button>

                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    border: `1px solid ${statusColor}`,
                    color: statusColor,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusColor }} />
                    {trip.status}
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      {trip.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      <MapPin size={15} color="var(--primary)" />
                      {trip.destination}, {trip.country}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} />
                      {new Date(trip.startDate).toLocaleDateString()}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <DollarSign size={14} color="var(--success)" />
                      {trip.currency} {trip.budget || 0}
                    </div>
                  </div>

                  {/* Action Toolbar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => { setSelectedTrip(trip); setModalOpen(true); }}
                        className="btn btn-outline"
                        style={{ padding: '0.4rem 0.65rem', fontSize: '0.75rem' }}
                        title="Edit Trip"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDuplicateTrip(trip._id)}
                        className="btn btn-outline"
                        style={{ padding: '0.4rem 0.65rem', fontSize: '0.75rem' }}
                        title="Duplicate Trip"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => handleToggleArchive(trip._id)}
                        className="btn btn-outline"
                        style={{ padding: '0.4rem 0.65rem', fontSize: '0.75rem' }}
                        title={trip.isArchived ? 'Unarchive' : 'Archive'}
                      >
                        <Archive size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteTrip(trip._id)}
                      style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: '0.4rem' }}
                      title="Delete Trip"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <TripModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTrip}
        tripToEdit={selectedTrip}
      />
    </div>
  );
};
