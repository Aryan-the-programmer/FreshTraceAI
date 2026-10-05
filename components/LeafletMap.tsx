'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { TruckItem } from '@/types/telemetry';

interface LeafletMapProps {
  trucks: TruckItem[];
  selectedTruckId?: string;
  onSelectTruck?: (id: string) => void;
  onSelectShipment?: (shipmentId: string) => void;
}

// Dynamically import LeafletMapInner with SSR disabled
const LeafletMapInner = dynamic(() => import('./LeafletMapInner'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 text-xs font-semibold">
      Loading Interactive Leaflet Fleet Map...
    </div>
  ),
});

export const LeafletMap: React.FC<LeafletMapProps> = (props) => {
  return <LeafletMapInner {...props} />;
};
