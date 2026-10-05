'use client';

import React, { useState } from 'react';
import { TruckItem } from '@/types/telemetry';
import { Truck, Battery, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

interface FleetPageProps {
  trucks: TruckItem[];
  onSelectTruck: (id: string) => void;
  onSelectShipment: (shipmentId: string) => void;
}

export const FleetPage: React.FC<FleetPageProps> = ({
  trucks,
  onSelectTruck,
  onSelectShipment,
}) => {
  const [filter, setFilter] = useState<'All' | 'Online' | 'Offline' | 'Needs Attention'>('All');

  const filteredTrucks = trucks.filter((t) => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              My Fleet
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage and monitor all 32 trucks in your logistics network.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 p-1 text-xs font-semibold self-start sm:self-auto">
            {(['All', 'Online', 'Offline', 'Needs Attention'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1 transition cursor-pointer ${
                  filter === f
                    ? 'bg-slate-900 text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Trucks
            </span>
            <div className="text-2xl font-black text-slate-900">32</div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-1">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              Online
            </span>
            <div className="text-2xl font-black text-emerald-600">27</div>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50/40 p-4 space-y-1">
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
              Offline
            </span>
            <div className="text-2xl font-black text-red-600">3</div>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-1">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              Needs Attention
            </span>
            <div className="text-2xl font-black text-amber-600">2</div>
          </div>
        </div>
      </div>

      {/* Trucks Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">TRUCK ID</th>
                <th className="py-3 px-4">DRIVER</th>
                <th className="py-3 px-4">CURRENT ROUTE</th>
                <th className="py-3 px-4">SHIPMENT</th>
                <th className="py-3 px-4">TEMPERATURE</th>
                <th className="py-3 px-4">BATTERY</th>
                <th className="py-3 px-4">CONNECTION</th>
                <th className="py-3 px-4">RISK</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredTrucks.map((truck) => {
                const isOffline = truck.status === 'Offline';
                const isAttention = truck.status === 'Needs Attention';

                return (
                  <tr
                    key={truck.id}
                    onClick={() => onSelectTruck(truck.id)}
                    className={`hover:bg-slate-50 cursor-pointer transition ${
                      isOffline ? 'bg-red-50/30' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {truck.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {truck.driver}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {truck.route}
                    </td>
                    <td
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectShipment(truck.shipmentId);
                      }}
                      className="py-3.5 px-4 font-bold text-sky-600 underline"
                    >
                      {truck.shipmentId}
                    </td>
                    <td
                      className={`py-3.5 px-4 font-bold ${
                        isOffline ? 'text-red-600' : 'text-slate-900'
                      }`}
                    >
                      {truck.temperature}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      {truck.battery}%
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {truck.connectionStatus}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-amber-600">
                      {truck.spoilageRisk}%
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`rounded px-2.5 py-1 text-[11px] font-bold ${
                          isOffline
                            ? 'bg-red-600 text-white' // MUST BE RED
                            : isAttention
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {truck.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
