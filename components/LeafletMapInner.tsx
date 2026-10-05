'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TruckItem } from '@/types/telemetry';

interface LeafletMapInnerProps {
  trucks: TruckItem[];
  selectedTruckId?: string;
  onSelectTruck?: (id: string) => void;
  onSelectShipment?: (shipmentId: string) => void;
}

// Convert truck percentages / real lat-lng coordinates for Central India
const truckCoords: Record<string, [number, number]> = {
  'TRK-104': [20.0041, 73.7862], // Nashik
  'TRK-108': [18.5204, 73.8567], // Pune
  'TRK-112': [21.1458, 79.0882], // Nagpur
  'TRK-119': [19.2290, 73.1582], // Mahabaleshwar
  'TRK-115': [22.7196, 75.8577], // Indore
  'TRK-122': [23.1815, 79.9864], // Jabalpur
  'TRK-130': [21.1702, 72.8311], // Surat
};

// Route coordinates: Nashik -> Pune -> Nagpur -> Raipur
const routePositions: [number, number][] = [
  [20.0041, 73.7862],
  [18.5204, 73.8567],
  [21.1458, 79.0882],
  [21.2514, 81.6296],
];

// Helper to create custom HTML markers with color coding
const createCustomIcon = (status: string, isSelected: boolean) => {
  const isOffline = status === 'Offline';
  const isAttention = status === 'Needs Attention';

  const bgColor = isOffline ? '#dc2626' : isAttention ? '#f59e0b' : '#16a34a';
  const borderColor = isSelected ? '#0284c7' : '#ffffff';
  const borderWidth = isSelected ? '3px' : '2px';

  const html = `
    <div style="
      background-color: ${bgColor};
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: ${borderWidth} solid ${borderColor};
      box-shadow: 0 4px 10px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 11px;
    ">
      ${isOffline ? '!' : '🚚'}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

export const LeafletMapInner: React.FC<LeafletMapInnerProps> = ({
  trucks,
  selectedTruckId,
  onSelectTruck,
  onSelectShipment,
}) => {
  const center: [number, number] = [20.5937, 78.9629]; // Central India

  return (
    <MapContainer
      center={center}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
    >
      {/* OpenStreetMap Tiles (Free, No API key required) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Transit Route Line */}
      <Polyline
        positions={routePositions}
        pathOptions={{ color: '#0284c7', weight: 4, dashArray: '6, 6' }}
      />

      {/* Truck Markers */}
      {trucks.map((truck) => {
        const position = truckCoords[truck.id] || [20.5937, 78.9629];
        const isSelected = selectedTruckId === truck.id;
        const icon = createCustomIcon(truck.status, isSelected);

        return (
          <Marker
            key={truck.id}
            position={position}
            icon={icon}
            eventHandlers={{
              click: () => onSelectTruck?.(truck.id),
            }}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-2 space-y-2 min-w-[200px] text-xs font-sans">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <strong className="text-slate-900 font-extrabold text-sm">
                    {truck.id}
                  </strong>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      truck.status === 'Offline'
                        ? 'bg-red-100 text-red-700'
                        : truck.status === 'Needs Attention'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {truck.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-1 text-slate-600">
                  <p>
                    <strong>Driver:</strong> {truck.driver}
                  </p>
                  <p>
                    <strong>Route:</strong> {truck.route}
                  </p>
                  <p>
                    <strong>Shipment:</strong>{' '}
                    <span
                      onClick={() => onSelectShipment?.(truck.shipmentId)}
                      className="text-sky-600 underline font-bold cursor-pointer"
                    >
                      {truck.shipmentId}
                    </span>
                  </p>
                  <p>
                    <strong>Temp:</strong>{' '}
                    <span
                      className={
                        truck.status === 'Offline' ? 'text-red-600 font-bold' : ''
                      }
                    >
                      {truck.temperature}
                    </span>
                  </p>
                  <p>
                    <strong>Spoilage Risk:</strong> {truck.spoilageRisk}%
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Last seen: {truck.lastSeen}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
export default LeafletMapInner;
