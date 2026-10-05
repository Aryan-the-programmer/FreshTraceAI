'use client';

import React from 'react';
import { ShipmentItem } from '@/types/telemetry';

interface ShipmentsPageProps {
  shipments: ShipmentItem[];
  onSelectShipment: (id: string) => void;
}

export const ShipmentsPage: React.FC<ShipmentsPageProps> = ({
  shipments,
  onSelectShipment,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Shipments
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Monitor every shipment currently moving through your network.
        </p>
      </div>

      {/* Shipments Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">SHIPMENT</th>
                <th className="py-3 px-4">PRODUCT</th>
                <th className="py-3 px-4">TRUCK</th>
                <th className="py-3 px-4">ORIGIN</th>
                <th className="py-3 px-4">DESTINATION</th>
                <th className="py-3 px-4">ETA</th>
                <th className="py-3 px-4">TEMPERATURE</th>
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
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    {s.product}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {s.truckId}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{s.origin}</td>
                  <td className="py-3.5 px-4 text-slate-600">{s.destination}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{s.eta}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {s.temperature}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {s.remainingShelfLife}
                  </td>
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
