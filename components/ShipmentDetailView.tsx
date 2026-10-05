'use client';

import React from 'react';
import Image from 'next/image';
import { ShipmentItem, TelemetryPoint } from '@/types/telemetry';
import { TemperatureStreamChart } from './Charts/TemperatureStreamChart';
import { DualStreamChart } from './Charts/DualStreamChart';
import { ArrowLeft, Thermometer, Droplets, Wind, Clock, ShieldCheck, Battery, Wifi, CheckCircle2 } from 'lucide-react';

interface ShipmentDetailViewProps {
  shipment: ShipmentItem;
  telemetry: TelemetryPoint[];
  onBack: () => void;
  onNavigateToAI: () => void;
  onNavigateToVerification: () => void;
}

export const ShipmentDetailView: React.FC<ShipmentDetailViewProps> = ({
  shipment,
  telemetry,
  onBack,
  onNavigateToAI,
  onNavigateToVerification,
}) => {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Shipments</span>
      </button>

      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Shipment {shipment.id}
              </h1>
              <span className="rounded-full bg-sky-100 px-3 py-0.5 text-xs font-extrabold text-sky-800">
                {shipment.status}
              </span>
            </div>
            <p className="text-sm font-extrabold text-slate-800">
              Product: <span className="font-normal text-slate-600">{shipment.product} ({shipment.volume})</span>
            </p>
            <p className="text-xs text-slate-500 font-medium">
              Route: <strong className="text-slate-800 font-bold">{shipment.origin} → {shipment.destination}</strong>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onNavigateToAI}
              className="rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
            >
              View AI Analysis
            </button>
            <button
              onClick={onNavigateToVerification}
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              Verify Record Fingerprint
            </button>
          </div>
        </div>
      </div>

      {/* 7 Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Temperature */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Temperature
          </span>
          <div className="text-xl font-black text-slate-900">{shipment.temperature}</div>
          <span className="text-[10px] font-bold text-emerald-600 block">Normal</span>
        </div>

        {/* Humidity */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Humidity
          </span>
          <div className="text-xl font-black text-slate-900">{shipment.humidity}</div>
          <span className="text-[10px] font-bold text-slate-500 block">Optimal</span>
        </div>

        {/* Ethylene */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Ethylene Gas
          </span>
          <div className="text-xl font-black text-slate-900">{shipment.ethylene}</div>
          <span className="text-[10px] font-bold text-slate-500 block">Safe Level</span>
        </div>

        {/* Shelf Life */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Shelf Life
          </span>
          <div className="text-xl font-black text-sky-600">{shipment.remainingShelfLife}</div>
          <span className="text-[10px] font-bold text-slate-500 block">Remaining</span>
        </div>

        {/* Spoilage Risk */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Spoilage Risk
          </span>
          <div className="text-xl font-black text-amber-600">{shipment.spoilageRisk}%</div>
          <span className="text-[10px] font-bold text-slate-500 block">Safe Margin</span>
        </div>

        {/* Battery */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Battery
          </span>
          <div className="text-xl font-black text-slate-900">{shipment.battery}%</div>
          <span className="text-[10px] font-bold text-emerald-600 block">Healthy</span>
        </div>

        {/* Connection */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1 col-span-2 md:col-span-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Connection
          </span>
          <div className="text-xl font-black text-emerald-600">{shipment.connectionStatus}</div>
          <span className="text-[10px] font-bold text-slate-500 block">Long-range active</span>
        </div>
      </div>

      {/* Sensor History Charts */}
      <TemperatureStreamChart data={telemetry} />
      <DualStreamChart />
    </div>
  );
};
