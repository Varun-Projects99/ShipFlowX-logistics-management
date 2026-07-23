import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Smile,
  CloudSun,
  Edit,
  Trash2,
  List,
  Clock,
  Heart
} from 'lucide-react';
import API from '../services/api';
import { MemoryModal } from '../components/memories/MemoryModal';

export const MemoriesPage = () => {
  const [memories, setMemories] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moodFilter, setMoodFilter] = useState('All');
  const [weatherFilter, setWeatherFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'grid'

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [memRes, tripsRes] = await Promise.all([
        API.get('/memories', { params: { mood: moodFilter, weather: weatherFilter, search } }),
        API.get('/trips')
      ]);

      if (memRes.data.success) setMemories(memRes.data.data);
      if (tripsRes.data.success) setTrips(tripsRes.data.data);
    } catch (err) {
      console.error('Failed to fetch memories:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [moodFilter, weatherFilter, search]);

  const handleSaveMemory = async (memoryData) => {
    try {
      if (selectedMemory) {
        await API.put(`/memories/${selectedMemory._id}`, memoryData);
      } else {
        await API.post('/memories', memoryData);
      }
      setModalOpen(false);
      setSelectedMemory(null);
      fetchData();
    } catch (err) {
      alert(err.message || 'Failed to save memory');
    }
  };

  const handleDeleteMemory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this memory entry?')) return;
    try {
      await API.delete(`/memories/${id}`);
      fetchData();
    } catch (err) {
      alert(err.message || 'Failed to delete memory');
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await API.post('/favorites/toggle', { itemType: 'memory', itemId: id });
      fetchData();
    } catch (err) {
      alert(err.message || 'Failed to toggle favorite');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
            Memory <span className="gradient-text">Journal</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
            Rich day-by-day logs, stories, ratings, and emotional highlights ({memories.length} Entries)
          </p>
        </div>

        <button onClick={() => { setSelectedMemory(null); setModalOpen(true); }} className="btn btn-primary">
          <Plus size={18} /> Log New Memory
        </button>
      </div>

      {/* Toolbar */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Search */}
        <div style={{ position: 'relative', minWidth: '220px', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search memories by story, location, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
          />
        </div>

        {/* Filters & View Mode Toggle */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={moodFilter} onChange={(e) => setMoodFilter(e.target.value)} className="form-input no-icon" style={{ width: 'auto' }}>
            <option value="All">All Moods</option>
            <option value="Happy">Happy 😊</option>
            <option value="Inspired">Inspired 💡</option>
            <option value="Relaxed">Relaxed 😌</option>
            <option value="Adventurous">Adventurous ⛰️</option>
            <option value="Romantic">Romantic ❤️</option>
            <option value="Nostalgic">Nostalgic 🌅</option>
          </select>

          <select value={weatherFilter} onChange={(e) => setWeatherFilter(e.target.value)} className="form-input no-icon" style={{ width: 'auto' }}>
            <option value="All">All Weather</option>
            <option value="Sunny">Sunny ☀️</option>
            <option value="Cloudy">Cloudy ⛅</option>
            <option value="Rainy">Rainy 🌧️</option>
            <option value="Snowy">Snowy ❄️</option>
            <option value="Windy">Windy 🌬️</option>
          </select>

          <div style={{ display: 'flex', backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '2px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setViewMode('timeline')}
              className={`btn ${viewMode === 'timeline' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', border: 'none' }}
            >
              <Clock size={15} /> Timeline
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', border: 'none' }}
            >
              <List size={15} /> Grid View
            </button>
          </div>
        </div>
      </div>

      {/* Content View */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          Loading journal entries...
        </div>
      ) : memories.length === 0 ? (
        <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <BookOpen size={48} color="var(--accent)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No memories logged yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', maxWidth: '400px', marginBottom: '1.5rem' }}>
            Log your daily stories, mood, weather, and ratings to keep your travel memory timeline alive.
          </p>
          <button onClick={() => { setSelectedMemory(null); setModalOpen(true); }} className="btn btn-primary">
            <Plus size={18} /> Log New Memory
          </button>
        </div>
      ) : viewMode === 'timeline' ? (
        /* TIMELINE VIEW */
        <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px dashed rgba(59, 130, 246, 0.3)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {memories.map((mem) => (
            <div key={mem._id} style={{ position: 'relative' }}>
              {/* Timeline Marker Point */}
              <div style={{
                position: 'absolute',
                left: '-2.15rem',
                top: '0px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                border: '4px solid var(--bg-main)',
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
              }} />

              <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary)', fontWeight: 600 }}>
                        {new Date(mem.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      {mem.mood && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Mood: <strong>{mem.mood}</strong>
                        </span>
                      )}
                      {mem.weather && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Weather: <strong>{mem.weather}</strong>
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {mem.title}
                    </h3>
                  </div>

                  {/* Rating Stars & Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', color: 'var(--warning)' }}>
                      {[...Array(mem.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} fill="var(--warning)" />
                      ))}
                    </div>
                    <button onClick={() => handleToggleFavorite(mem._id)} style={{ background: 'none', border: 'none', color: mem.isFavorite ? 'var(--error)' : 'var(--text-dim)', cursor: 'pointer' }}>
                      <Heart size={16} fill={mem.isFavorite ? 'var(--error)' : 'transparent'} />
                    </button>
                    <button onClick={() => { setSelectedMemory(mem); setModalOpen(true); }} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDeleteMemory(mem._id)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Location & Trip Tag */}
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                  {mem.location && <span>📍 {mem.location}</span>}
                  {mem.trip && <span>✈️ Trip: {mem.trip.title}</span>}
                </div>

                {/* Description Content */}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {mem.description}
                </p>

                {/* Attached Photo Preview */}
                {Array.isArray(mem.photos) && mem.photos.length > 0 && (
                  <div style={{ width: '100%', maxHeight: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginTop: '0.5rem' }}>
                    <img src={mem.photos[0]} alt={mem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* GRID VIEW */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {memories.map((mem) => (
            <div key={mem._id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                  {new Date(mem.date).toLocaleDateString()}
                </span>
                <div style={{ display: 'flex', color: 'var(--warning)' }}>
                  {[...Array(mem.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--warning)" />
                  ))}
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{mem.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {mem.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Mood: {mem.mood}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => { setSelectedMemory(mem); setModalOpen(true); }} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDeleteMemory(mem._id)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Memory Modal */}
      <MemoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveMemory}
        trips={trips}
        memoryToEdit={selectedMemory}
      />
    </div>
  );
};
