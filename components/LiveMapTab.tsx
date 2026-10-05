'use client';

import React, { useState } from 'react';
import { MapTruckNode, RelayNode, Shipment } from '@/types/telemetry';
import { RelayNetworkSection } from './RelayNetworkSection';
import { ActiveShipmentsTable } from './ActiveShipmentsTable';
import { LeafletMap } from './LeafletMap';
import { mockTrucks } from '@/lib/mockData';

interface LiveMapTabProps {
  trucks: MapTruckNode[];
  relayNodes: RelayNode[];
  shipments: Shipment[];
  onSelectShipment: (id: string) => void;
}

export const LiveMapTab: React.FC<LiveMapTabProps> = ({
  trucks,
  relayNodes,
  shipments,
  onSelectShipment,
}) => {
  const [selectedTruckId, setSelectedTruckId] = useState<string>('TRK-112');

  return (
    <div className="space-y-6">
      {/* Top Map Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Live Fleet Tracking (Leaflet Interactive Map)
            </h1>
            <p className="text-xs text-slate-500">
              Real-time location, thermal status, and long-range connectivity across Central India transit lines.
            </p>
          </div>

          {/* Status Legend */}
          <div className="flex items-center gap-3 text-xs font-semibold rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 self-start sm:self-auto">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-700">Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
              <span className="text-slate-700">Warning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
              <span className="text-slate-700 font-bold">Offline</span>
            </div>
          </div>
        </div>

        {/* Leaflet Real Interactive Map */}
        <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
          <LeafletMap
            trucks={mockTrucks}
            selectedTruckId={selectedTruckId}
            onSelectTruck={(id) => setSelectedTruckId(id)}
            onSelectShipment={onSelectShipment}
          />
        </div>
      </div>

      {/* Store-and-Forward Relay Network */}
      <RelayNetworkSection nodes={relayNodes} />

      {/* Active Shipments Telemetry Table */}
      <ActiveShipmentsTable
        shipments={shipments}
        onSelectShipment={onSelectShipment}
      />
    </div>
  );
};
