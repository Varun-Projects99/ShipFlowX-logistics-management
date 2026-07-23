import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon marker URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export const InteractiveTravelMap = ({ trips = [], height = '400px' }) => {
  const defaultCenter = [20.5937, 78.9629]; // Default global view

  const validTrips = trips.filter(t => t.coordinates && t.coordinates.lat && t.coordinates.lng);
  const center = validTrips.length > 0 ? [validTrips[0].coordinates.lat, validTrips[0].coordinates.lng] : defaultCenter;

  return (
    <div style={{ height, width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
      <MapContainer center={center} zoom={3} style={{ height: '100%', width: '100%', backgroundColor: '#0F172A' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {validTrips.map((trip) => (
          <Marker key={trip._id} position={[trip.coordinates.lat, trip.coordinates.lng]}>
            <Popup>
              <div style={{ padding: '0.25rem' }}>
                <strong style={{ fontSize: '1rem', color: '#0F172A', display: 'block' }}>{trip.title}</strong>
                <span style={{ fontSize: '0.8rem', color: '#475569', display: 'block' }}>📍 {trip.destination}, {trip.country}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3B82F6', marginTop: '0.25rem', display: 'block' }}>
                  Status: {trip.status} | {trip.travelType}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
