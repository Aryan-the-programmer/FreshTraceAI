'use client';

import React from 'react';
import { ShipmentItem } from '@/types/telemetry';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface WholesalerDashboardProps {
  stats: {
    arrivingToday: number;
    inTransit: number;
    highRisk: number;
    averageShelfLife: string;
  };
  incomingShipments: ShipmentItem[];
  onSelectShipment: (id: string) => void;
  onNavigateToCheck: () => void;
}

export const WholesalerDashboard: React.FC<WholesalerDashboardProps> = ({
  stats,
  incomingShipments,
  onSelectShipment,
  onNavigateToCheck,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Good morning
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Here is the condition of your incoming shipments.
          </p>
        </div>

        {/* 4 Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Arriving Today
            </span>
            <div className="text-2xl font-black text-slate-900">{stats.arrivingToday}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              In Transit
            </span>
            <div className="text-2xl font-black text-slate-900">{stats.inTransit}</div>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-1">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              High Risk
            </span>
            <div className="text-2xl font-black text-amber-600">{stats.highRisk}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Average Shelf Life
            </span>
            <div className="text-2xl font-black text-slate-900">{stats.averageShelfLife}</div>
          </div>
        </div>
      </div>

      {/* Prominent Shipment Check Section */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-emerald-200/60 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 block">
              AUTOMATED INTAKE DECISION
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Shipment Check — SH-1024
            </h2>
          </div>

          <div className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white self-start sm:self-auto shadow-xs">
            RECOMMENDATION: SAFE TO RECEIVE
          </div>
        </div>

        {/* Verification Checkmarks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Temperature is within the recommended range</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>No tampering detected</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Shipment history is verified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Estimated shelf life: 6.4 days</span>
          </div>
        </div>
      </div>

      {/* Incoming Shipments List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Incoming Shipments
          </h2>
          <span className="text-xs text-slate-500 font-medium">Updated live</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {incomingShipments.map((s) => {
            const isSafe = s.decisionRecommendation === 'SAFE TO RECEIVE';

            return (
              <div
                key={s.id}
                onClick={() => onSelectShipment(s.id)}
                className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 hover:border-slate-300 transition cursor-pointer shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-sky-600">
                      {s.id}
                    </span>
                    <span
                      className={`rounded px-2.5 py-0.5 text-[10px] font-extrabold ${
                        isSafe
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {s.decisionRecommendation || 'REVIEW BEFORE RECEIVING'}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">
                    {s.product}
                  </h3>
                  <p className="text-xs text-slate-500">
                    From {s.origin} • Truck {s.truckId}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-50 p-2.5 text-center text-xs pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">ETA</span>
                    <span className="font-extrabold text-slate-900">{s.eta}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Temp</span>
                    <span className="font-extrabold text-slate-900">{s.temperature}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Shelf Life</span>
                    <span className="font-extrabold text-sky-600">{s.remainingShelfLife}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
