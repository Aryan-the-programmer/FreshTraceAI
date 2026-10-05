'use client';

import React from 'react';
import { DashboardOverviewStats, Shipment, RelayNode } from '@/types/telemetry';
import { RelayNetworkSection } from './RelayNetworkSection';
import { ActiveShipmentsTable } from './ActiveShipmentsTable';
import {
  SlidersHorizontal,
  Radio,
  Truck,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface OverviewTabProps {
  stats: DashboardOverviewStats;
  shipments: Shipment[];
  relayNodes: RelayNode[];
  onSelectShipment: (id: string) => void;
  onNavigateToMap: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  stats,
  shipments,
  relayNodes,
  onSelectShipment,
  onNavigateToMap,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner Box */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold tracking-widest text-sky-600 uppercase">
                CORRIDOR COMMAND NODE // V4.18
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-800 border border-sky-100">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                LoRa Mesh & Gateway: 99.4% Synchronized
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Good morning, Alex
            </h1>
            <p className="text-xs text-slate-500">
              Real-time cold-chain telemetry and fleet monitoring across all active transit corridors.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs">
              <SlidersHorizontal className="h-4 w-4 text-slate-500" />
              <span>Telemetry Filters</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition cursor-pointer shadow-xs">
              <Radio className="h-4 w-4 text-sky-400" />
              <span>Mesh Broadcast</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* 1. Active Shipments */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="uppercase tracking-wider">ACTIVE SHIPMENTS</span>
              <Truck className="h-4 w-4 text-sky-500" />
            </div>
            <div className="text-3xl font-black text-slate-900">
              {stats.activeShipments.count}
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="font-bold text-sky-600">
                {stats.activeShipments.trend}
              </span>
              <span className="text-slate-500">
                {stats.activeShipments.corridorsCount} corridors
              </span>
            </div>
          </div>

          {/* 2. Trucks In Transit */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="uppercase tracking-wider">TRUCKS IN TRANSIT</span>
              <Truck className="h-4 w-4 text-sky-500" />
            </div>
            <div className="text-3xl font-black text-slate-900">
              {stats.trucksInTransit.count}
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-600 font-semibold">
                {stats.trucksInTransit.onlineCount} Online
              </span>
              <span className="rounded-md bg-red-100 px-1.5 py-0.5 font-bold text-red-700">
                {stats.trucksInTransit.offlineCount} Offline
              </span>
            </div>
          </div>

          {/* 3. Avg Shelf Life */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="uppercase tracking-wider">AVG SHELF LIFE</span>
              <Clock className="h-4 w-4 text-sky-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">
                {stats.avgShelfLife.days}
              </span>
              <span className="text-xs font-bold text-slate-600">Days</span>
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="font-bold text-sky-600">
                {stats.avgShelfLife.aiOptimized}
              </span>
              <span className="text-slate-500">{stats.avgShelfLife.label}</span>
            </div>
          </div>

          {/* 4. High-Risk Shipments */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-xs font-bold text-red-600">
              <span className="uppercase tracking-wider">HIGH-RISK SHIPMENTS</span>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-3xl font-black text-red-600">
              {stats.highRiskShipments.count}
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="font-bold text-red-600">Action Required</span>
              <span className="text-slate-500 font-mono">
                {stats.highRiskShipments.reason}
              </span>
            </div>
          </div>

          {/* 5. Data Integrity */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="uppercase tracking-wider">DATA INTEGRITY</span>
              <ShieldCheck className="h-4 w-4 text-sky-500" />
            </div>
            <div className="text-3xl font-black text-slate-900">
              {stats.dataIntegrity.percentage}
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-500 font-mono">
                {stats.dataIntegrity.batches} batches
              </span>
              <span className="font-bold text-sky-600">Hash Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Cold-Chain Intelligence Banner (Dark Indigo Theme Card) */}
      <div className="rounded-xl bg-slate-900 p-6 text-white shadow-md space-y-4 relative overflow-hidden border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Sparkles className="h-4 w-4 text-sky-400" />
          <span>AI Cold-Chain Intelligence • 12 shipments analyzed today</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Anomaly box inside */}
          <div className="lg:col-span-2 rounded-xl bg-slate-800/80 border border-slate-700/80 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wide">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping"></span>
              <span>CORRIDOR ANOMALY DETECTED</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Shipment <strong className="text-sky-300 font-mono underline cursor-pointer" onClick={() => onSelectShipment('SH-1024')}>SH-1024</strong> shows an elevated spoilage risk due to sustained temperature exposure (<strong className="text-red-400">+2.4°C for 25 min</strong>). Estimated remaining shelf life has decreased by <strong className="text-amber-300">1.2 days</strong>.
            </p>
          </div>

          {/* Quick Metrics & CTA */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-slate-800 p-2">
                <span className="block text-xs font-bold text-slate-200">6.8d</span>
                <span className="text-[10px] text-slate-400">Avg Shelf Life</span>
              </div>
              <div className="rounded-lg bg-slate-800 p-2">
                <span className="block text-xs font-bold text-sky-400">18.4%</span>
                <span className="text-[10px] text-slate-400">Avg Spoilage Risk</span>
              </div>
              <div className="rounded-lg bg-slate-800 p-2">
                <span className="block text-xs font-bold text-red-400">3</span>
                <span className="text-[10px] text-slate-400">Predicted At-Risk</span>
              </div>
            </div>

            <button
              onClick={() => onSelectShipment('SH-1024')}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-500 transition cursor-pointer"
            >
              <span>View AI Analytics</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* LoRa Relay Network Section */}
      <RelayNetworkSection nodes={relayNodes} />

      {/* Active Shipments Telemetry Table */}
      <ActiveShipmentsTable
        shipments={shipments}
        onSelectShipment={onSelectShipment}
      />
    </div>
  );
};
