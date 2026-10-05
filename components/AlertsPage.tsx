'use client';

import React, { useState } from 'react';
import { AlertItem } from '@/types/telemetry';
import { AlertTriangle, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface AlertsPageProps {
  alerts: AlertItem[];
  onSelectShipment: (id: string) => void;
  onSelectTruck: (id: string) => void;
}

export const AlertsPage: React.FC<AlertsPageProps> = ({
  alerts,
  onSelectShipment,
  onSelectTruck,
}) => {
  const [filterCategory, setFilterCategory] = useState<'All' | 'Needs attention' | 'Warnings' | 'Resolved'>('All');

  const filteredAlerts = alerts.filter((a) => {
    if (filterCategory === 'All') return true;
    return a.category === filterCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Alerts & Notifications
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Real-time warnings and operational alerts across your transit fleet.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 p-1 text-xs font-semibold self-start sm:self-auto">
            {(['All', 'Needs attention', 'Warnings', 'Resolved'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`rounded-full px-3 py-1 transition cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-slate-900 text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alt) => {
          const isCritical = alt.severity === 'Critical';
          const isWarning = alt.severity === 'Warning';

          return (
            <div
              key={alt.id}
              className={`rounded-2xl border p-5 space-y-3 transition shadow-xs ${
                isCritical
                  ? 'border-red-200 bg-red-50/40'
                  : isWarning
                  ? 'border-amber-200 bg-amber-50/40'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-md px-2.5 py-0.5 text-[11px] font-mono font-black ${
                      isCritical
                        ? 'bg-red-600 text-white'
                        : isWarning
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {alt.severity.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {alt.time}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold">
                  {alt.truckId && (
                    <button
                      onClick={() => onSelectTruck(alt.truckId!)}
                      className="text-slate-800 hover:text-slate-900 underline"
                    >
                      Truck {alt.truckId}
                    </button>
                  )}
                  {alt.shipmentId && (
                    <button
                      onClick={() => onSelectShipment(alt.shipmentId!)}
                      className="text-sky-600 hover:text-sky-700 underline"
                    >
                      Shipment {alt.shipmentId}
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                {alt.problem}
              </p>

              <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                <button
                  onClick={() => {
                    if (alt.shipmentId) onSelectShipment(alt.shipmentId);
                    else if (alt.truckId) onSelectTruck(alt.truckId);
                  }}
                  className="flex items-center gap-1 text-xs font-extrabold text-slate-900 hover:text-sky-600 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
