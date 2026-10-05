'use client';

import React, { useState } from 'react';
import { TruckItem, ShipmentItem } from '@/types/telemetry';
import { LeafletMap } from './LeafletMap';
import { ArrowRight } from 'lucide-react';

interface FleetOwnerOverviewProps {
  stats: {
    activeTrucks: number;
    offlineTrucks: number;
    activeShipments: number;
    highRiskShipments: number;
    averageShelfLife: string;
  };
  trucks: TruckItem[];
  shipments: ShipmentItem[];
  onSelectTruck: (truckId: string) => void;
  onSelectShipment: (shipmentId: string) => void;
  onNavigateToMap: () => void;
}

export const FleetOwnerOverview: React.FC<FleetOwnerOverviewProps> = ({
  stats,
  trucks,
  shipments,
  onSelectTruck,
  onSelectShipment,
  onNavigateToMap,
}) => {
  const [selectedTruckId, setSelectedTruckId] = useState<string>('TRK-112');
  const selectedTruck = trucks.find((t) => t.id === selectedTruckId) || trucks[2];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Fleet Overview
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Here&apos;s what is happening across your trucks and shipments.
            </p>
          </div>

          <button
            onClick={onNavigateToMap}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer shadow-xs self-start sm:self-auto"
          >
            <span>Open Interactive Map</span>
            <ArrowRight className="h-3.5 w-3.5 text-sky-400" />
          </button>
        </div>

        {/* 5 Top Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* Active Trucks */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Trucks
            </span>
            <div className="text-2xl font-black text-slate-900">
              {stats.activeTrucks}
            </div>
            <span className="text-[11px] font-bold text-emerald-600 block">
              Online & Operational
            </span>
          </div>

          {/* Offline Trucks (MUST BE RED) */}
          <div className="rounded-xl border border-red-200 bg-red-50/40 p-4 space-y-1">
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
              Offline Trucks
            </span>
            <div className="text-2xl font-black text-red-600">
              {stats.offlineTrucks}
            </div>
            <span className="text-[11px] font-bold text-red-600 block">
              Requires Inspection
            </span>
          </div>

          {/* Active Shipments */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Shipments
            </span>
            <div className="text-2xl font-black text-slate-900">
              {stats.activeShipments}
            </div>
            <span className="text-[11px] font-bold text-sky-600 block">
              In Transit
            </span>
          </div>

          {/* High-Risk Shipments */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-1">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              High-Risk Shipments
            </span>
            <div className="text-2xl font-black text-amber-600">
              {stats.highRiskShipments}
            </div>
            <span className="text-[11px] font-bold text-amber-700 block">
              Temperature Warnings
            </span>
          </div>

          {/* Average Shelf Life */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1 col-span-2 lg:col-span-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Average Shelf Life
            </span>
            <div className="text-2xl font-black text-slate-900">
              {stats.averageShelfLife}
            </div>
            <span className="text-[11px] font-bold text-slate-600 block">
              AI Optimized Index
            </span>
          </div>
        </div>
      </div>

      {/* Live Fleet Map Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Live Fleet Map (Interactive Leaflet)
          </h2>

          {/* Legend */}
          <div className="flex items-center gap-3 text-xs font-semibold rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span>Green: Online</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
              <span>Yellow: Attention</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
              <span className="font-bold text-red-600">Red: Offline</span>
            </div>
          </div>
        </div>

        {/* Leaflet Map Container */}
        <div className="h-[460px] w-full rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
          <LeafletMap
            trucks={trucks}
            selectedTruckId={selectedTruckId}
            onSelectTruck={(id) => {
              setSelectedTruckId(id);
            }}
            onSelectShipment={onSelectShipment}
          />
        </div>
      </div>

      {/* Active Shipments Quick Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Active Shipments Quick List
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            24 Total Shipments
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">SHIPMENT</th>
                <th className="py-3 px-4">PRODUCT</th>
                <th className="py-3 px-4">TRUCK</th>
                <th className="py-3 px-4">TEMP</th>
                <th className="py-3 px-4">SHELF LIFE</th>
                <th className="py-3 px-4">RISK</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {shipments.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => onSelectShipment(s.id)}
                  className="hover:bg-slate-50 cursor-pointer transition"
                >
                  <td className="py-3.5 px-4 font-bold text-sky-600 underline">
                    {s.id}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    {s.product}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {s.truckId}
                  </td>
                  <td className="py-3.5 px-4 font-bold">{s.temperature}</td>
                  <td className="py-3.5 px-4 font-bold">{s.remainingShelfLife}</td>
                  <td className="py-3.5 px-4 font-bold text-amber-600">
                    {s.spoilageRisk}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="rounded bg-sky-100 px-2 py-0.5 font-bold text-sky-800 text-[11px]">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
