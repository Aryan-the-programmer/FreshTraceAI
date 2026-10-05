'use client';

import React from 'react';
import Image from 'next/image';
import {
  WholesalerStats,
  VerificationProtocolItem,
  IncomingManifestRow,
  AllocationChannel,
  IntakeBayData,
} from '@/types/telemetry';

import {
  Truck,
  CheckCircle2,
  FileCheck,
  AlertTriangle,
  FileText,
  Lock,
  ArrowRight,
  Zap,
  Store,
  Snowflake,
  Radio,
  Building,
  RefreshCw,
  Sliders,
  CheckSquare,
  ShieldCheck,
  Layers,
} from 'lucide-react';

interface WholesalerPortalTabProps {
  stats: WholesalerStats;
  protocolItems: VerificationProtocolItem[];
  manifestRows: IncomingManifestRow[];
  channels: AllocationChannel[];
  bays: IntakeBayData[];
  onSelectShipment: (id: string) => void;
}

export const WholesalerPortalTab: React.FC<WholesalerPortalTabProps> = ({
  stats,
  protocolItems,
  manifestRows,
  channels,
  bays,
  onSelectShipment,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-0.5 text-xs font-mono font-bold text-sky-800 border border-sky-100">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                DOCKSIDE RECEIVING HUB // BAY 03 • TERMINAL LORA GATEWAY GW-09 LIVE
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Wholesaler Intake Portal — Raipur Regional Terminal
            </h1>
            <p className="text-xs text-slate-500">
              Automated cold-chain verification, shelf-life clearance, and acceptance workflows
            </p>
          </div>

          {/* Operator Terminal Info Card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sky-400">
              <Building className="h-5 w-5" />
            </div>
            <div className="text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                OPERATOR TERMINAL
              </span>
              <span className="font-extrabold text-slate-900 block">
                Raipur Produce Wholesale Consortium
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                ID: RPC-INSPECT-STATION-03
              </span>
            </div>
          </div>
        </div>

        {/* 4 Summary Stat Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* 1. Incoming Today */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between hover:border-slate-300 transition">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                INCOMING TODAY
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-slate-900">
                  {stats.incomingToday}
                </span>
                <span className="text-xs font-bold text-slate-600">Shipments</span>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <Truck className="h-5 w-5" />
            </div>
          </div>

          {/* 2. Cleared for Intake */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between hover:border-slate-300 transition">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                CLEARED FOR INTAKE
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-slate-900">
                  {stats.clearedForIntake}
                </span>
                <span className="text-xs font-bold text-sky-600">Passed QA</span>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>

          {/* 3. Under Review */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between hover:border-slate-300 transition">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                UNDER REVIEW
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-slate-900">
                  {stats.underReview}
                </span>
                <span className="text-xs font-bold text-slate-600">Audit Req</span>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <FileCheck className="h-5 w-5" />
            </div>
          </div>

          {/* 4. Flagged At Risk */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between hover:border-slate-300 transition">
            <div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">
                FLAGGED AT RISK
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-red-600">
                  {stats.flaggedAtRisk}
                </span>
                <span className="text-xs font-bold text-red-600">Excursion</span>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Intake Triage Verification Container */}
      <div className="rounded-xl border border-sky-200 bg-white overflow-hidden shadow-sm">
        {/* Top Highlight Strip */}
        <div className="bg-sky-600 h-1.5 w-full"></div>

        <div className="p-6 space-y-6">
          {/* Header Row of Triage Box */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded bg-sky-100 px-2 py-0.5 text-xs font-mono font-bold text-sky-800">
                  SHIPMENT SH-1024
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-mono font-semibold text-slate-700">
                  DOCK BAY 04 APPROACH
                </span>
                <span className="text-xs font-extrabold text-red-600">
                  ETA: 14 MINS
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-extrabold text-sm">
                  ✓
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Fresh Honeycrisp Apples (2,400 kg) — Truck TRK-104
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Origin: Solan Valley Orchards • Batch Lot: SV-2024-APL-092 • Carrier: AgroHaul Logistics
                  </p>
                </div>
              </div>
            </div>

            {/* Verdict Box Right */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-center min-w-[240px] space-y-1">
              <span className="text-[10px] font-mono font-bold tracking-wider text-sky-700 block uppercase">
                AUTOMATED DECISION VERDICT
              </span>
              <span className="text-sm font-black text-slate-900 block">
                RECOMMENDATION: SAFE TO RECEIVE
              </span>
              <span className="text-[11px] font-bold text-slate-500 block">
                GRADE A QUALIFIED (99.8% CONFIDENCE)
              </span>
            </div>
          </div>

          {/* Main 2 Column Body: 5-Point Verification Left vs Telemetry/Vault Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 cols: 5-Point Real-Time Cold-Chain Verification Protocol */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
                5-POINT REAL-TIME COLD-CHAIN VERIFICATION PROTOCOL
              </span>

              <div className="space-y-2.5">
                {protocolItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded bg-sky-600 text-white shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight">
                          {item.subtext}
                        </p>
                      </div>
                    </div>

                    <span className="rounded bg-sky-100 px-2.5 py-1 text-[11px] font-mono font-bold text-sky-900 shrink-0 ml-2">
                      {item.statusBadge}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-3">
                <button className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer shadow-xs">
                  <CheckSquare className="h-4 w-4 text-sky-400" />
                  <span>Accept & Sign Digital BOL</span>
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs">
                  <Sliders className="h-4 w-4 text-slate-500" />
                  <span>Initiate Dock 4 Physical QA</span>
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs">
                  <FileText className="h-4 w-4 text-slate-500" />
                  <span>Certificate of Authenticity</span>
                </button>
              </div>
            </div>

            {/* Right 5 cols: Transit Telemetry Envelope & Assigned Cold Vault */}
            <div className="lg:col-span-5 space-y-4">
              {/* Telemetry Envelope Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    TRANSIT TELEMETRY ENVELOPE (LAST 18H)
                  </span>
                  <span className="rounded bg-sky-50 px-2 py-0.5 text-[10px] font-mono font-bold text-sky-700 border border-sky-100">
                    STABLE ±0.3°C
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Upper Threshold:</span>
                    <span className="font-bold text-slate-700">7.0°C</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Current:</span>
                    <span className="font-extrabold text-sky-600">5.1°C</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Lower:</span>
                    <span className="font-bold text-slate-700">2.0°C</span>
                  </div>
                </div>

                {/* Sparkline Graphic */}
                <div className="h-16 w-full pt-1">
                  <svg className="w-full h-full" viewBox="0 0 300 60">
                    <path
                      d="M 0 40 Q 60 42, 100 25 T 200 45 L 300 20"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                <div className="flex justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-1.5">
                  <span>00:00 Depart Solan</span>
                  <span>08:00 Waypoint NH-44</span>
                  <span>15:45 Raipur Terminal Gate</span>
                </div>
              </div>

              {/* Assigned Cold Vault Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3">
                {/* Vault Cam Image */}
                <div className="relative h-20 w-24 rounded-lg bg-slate-900 overflow-hidden shrink-0">
                  <Image
                    src="/images/cold_storage_vault.jpg"
                    alt="Vault C-12 Preview"
                    fill
                    className="object-cover opacity-90"
                  />
                  <span className="absolute bottom-1 left-1 rounded bg-slate-900/80 px-1 text-[9px] font-mono text-white">
                    Dock Cam 04 Preview
                  </span>
                </div>

                {/* Vault Info */}
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    ASSIGNED COLD VAULT
                  </span>
                  <h4 className="text-sm font-black text-slate-900">
                    Vault C-12
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Preset: 3.5°C • 90% RH
                  </p>
                  <span className="inline-flex items-center gap-1 font-bold text-sky-600 text-[11px]">
                    <Zap className="h-3 w-3" />
                    Auto-Dispatched Staging Bay
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Incoming Today Shipment Manifest Table Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Incoming Today Shipment Manifest
            </h2>
            <p className="text-xs text-slate-500">
              Live telemetry, predictive decay modeling, and direct intake triage
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer">
              <Sliders className="h-3.5 w-3.5 text-slate-500" />
              <span>All Products (4)</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer">
              <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
              <span>Refresh Manifest</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">ARRIVAL ETA</th>
                <th className="py-3 px-4">PRODUCT & VOLUME</th>
                <th className="py-3 px-4">TRUCK / CARRIER</th>
                <th className="py-3 px-4">TEMP RANGE</th>
                <th className="py-3 px-4">REMAINING SHELF LIFE</th>
                <th className="py-3 px-4">SPOILAGE RISK</th>
                <th className="py-3 px-4">BLOCKCHAIN PROOF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {manifestRows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onSelectShipment(row.id)}
                  className={`hover:bg-slate-50 transition cursor-pointer ${
                    row.isOffline ? 'bg-red-50/20' : ''
                  }`}
                >
                  {/* Arrival ETA */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-extrabold block ${
                        row.isOffline ? 'text-red-600' : 'text-slate-900'
                      }`}
                    >
                      {row.eta}
                    </span>
                    <span
                      className={`text-[11px] font-semibold block ${
                        row.isOffline ? 'text-red-500' : 'text-sky-600'
                      }`}
                    >
                      {row.etaSub}
                    </span>
                  </td>

                  {/* Product & Volume */}
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-slate-900 block">
                      {row.product}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {row.volume} • {row.batch}
                    </span>
                  </td>

                  {/* Truck */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`rounded px-2 py-0.5 font-bold font-mono ${
                        row.isOffline
                          ? 'bg-red-100 text-red-700'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {row.truck}
                    </span>
                  </td>

                  {/* Temp Range */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-bold ${
                        row.isTempAlert
                          ? 'text-amber-600'
                          : row.isOffline
                          ? 'text-red-600'
                          : 'text-slate-800'
                      }`}
                    >
                      {row.tempRange}
                    </span>
                  </td>

                  {/* Remaining Shelf Life */}
                  <td
                    className={`py-3.5 px-4 font-bold ${
                      row.isOffline ? 'text-red-600' : 'text-slate-800'
                    }`}
                  >
                    {row.remainingShelfLife}
                  </td>

                  {/* Spoilage Risk */}
                  <td className="py-3.5 px-4 w-44">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            row.spoilageRisk > 50
                              ? 'bg-red-500'
                              : row.spoilageRisk > 30
                              ? 'bg-amber-500'
                              : 'bg-sky-500'
                          }`}
                          style={{ width: `${row.spoilageRisk}%` }}
                        ></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">
                        {row.spoilageRiskText}
                      </span>
                    </div>
                  </td>

                  {/* Blockchain Proof */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 font-semibold text-xs ${
                        row.isOffline ? 'text-slate-500 font-mono' : 'text-slate-700'
                      }`}
                    >
                      {!row.isOffline && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" />
                      )}
                      {row.blockchainSync}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Predictive Routing & Gateway Reconciliation Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Shelf-Life Based Inventory Allocation Planner */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-widest text-sky-600 uppercase">
                AI PREDICTIVE ROUTING
              </span>
              <span className="rounded bg-sky-50 px-2 py-0.5 text-[10px] font-mono font-bold text-sky-800 border border-sky-100">
                DYNAMIC FCFS → FEFO
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Shelf-Life Based Inventory Allocation Planner
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automatically partitions incoming cold-chain cargo into optimal downstream distribution channels based on real-time biological age and temperature degradation indices.
            </p>
          </div>

          {/* 3 Channel Cards */}
          <div className="space-y-3">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4 gap-3 hover:border-slate-200 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700 shrink-0">
                    {channel.icon === 'lightning' && <Zap className="h-4 w-4" />}
                    {channel.icon === 'store' && <Store className="h-4 w-4" />}
                    {channel.icon === 'snowflake' && <Snowflake className="h-4 w-4" />}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-extrabold text-slate-900">
                        {channel.title}
                      </h4>
                      <span className="rounded bg-sky-100 px-2 py-0.5 text-[10px] font-mono font-bold text-sky-800">
                        {channel.timeBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">
                      {channel.description}
                    </p>
                  </div>
                </div>

                <button
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold shrink-0 cursor-pointer transition ${
                    channel.isDarkButton
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {channel.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] font-bold text-slate-500 gap-1">
            <span>AI Waste Minimization Policy: ACTIVE</span>
            <span className="text-sky-600 font-mono">
              Estimated Food Loss Avoidance: $14,288 / wk
            </span>
          </div>
        </div>

        {/* Right 5 cols: Gateway Reconciliation / LoRa Telemetry Log */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-widest text-sky-600 uppercase">
                GATEWAY RECONCILIATION
              </span>
              <span className="h-2 w-2 rounded-full bg-sky-500"></span>
            </div>

            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              LoRa Store-and-Forward Telemetry Log
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Seamless offline-to-online buffer handoff. In transit blindspots, vehicle IoT stores encrypted logs and flushes to terminal gateway upon geo-fence arrival.
            </p>
          </div>

          {/* Audit Pass Box */}
          <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-sky-100 pb-2">
              <span className="font-bold text-slate-900">
                TRK-112 Buffer Reconciliation
              </span>
              <span className="rounded bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800">
                100% AUDIT PASS
              </span>
            </div>

            <div className="space-y-1 text-[11px] text-slate-700">
              <div className="flex justify-between">
                <span>Buffered Records Recovered</span>
                <span className="font-bold text-slate-900">247 Sensor Frames</span>
              </div>
              <div className="flex justify-between">
                <span>Deadzone Duration (NH-53)</span>
                <span className="font-bold text-slate-900">
                  3h 42m (Offline Mode)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ingest Gateway</span>
                <span className="font-bold text-sky-700">Raipur-LoRa-GW09</span>
              </div>
              <div className="flex justify-between">
                <span>Blockchain Merkle Root Hash</span>
                <span className="font-bold text-slate-600">8x9b4a...f712</span>
              </div>
            </div>
          </div>

          {/* Data Continuity Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Data Continuity Verification</span>
              <span className="text-sky-600 font-mono">0 Missing Packets (100.0%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full w-full"></div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-500">
              Terminal Gateway Frequency: 868 MHz
            </span>
            <button className="flex items-center gap-1 font-bold text-sky-600 hover:text-sky-700 cursor-pointer">
              <span>View Ledger</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Spatial Terminal Telemetry (Raipur Terminal Receiving Docks) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-sky-600 uppercase">
              SPATIAL TERMINAL TELEMETRY
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Raipur Terminal Receiving Docks & Vault Temperature Distribution
            </h3>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-500"></span>
              <span className="text-slate-700">Dock 1-4 Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-300"></span>
              <span className="text-slate-500">Standby</span>
            </div>
          </div>
        </div>

        {/* 4 Intake Bay Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bays.map((bay) => {
            const isReserved = bay.badgeType === 'reserved';
            const isPrecheck = bay.badgeType === 'precheck';

            return (
              <div
                key={bay.id}
                className={`rounded-xl border p-4 flex flex-col justify-between space-y-4 transition ${
                  isReserved
                    ? 'border-sky-600 bg-sky-50/30 ring-2 ring-sky-500/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {bay.name}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold ${
                        isReserved
                          ? 'bg-sky-600 text-white'
                          : isPrecheck
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {bay.statusBadge}
                    </span>
                  </div>

                  {/* Icon & Details */}
                  <div className="text-center py-2 space-y-1">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-2xs border border-slate-200 text-slate-700">
                      {isReserved ? (
                        <Truck className="h-5 w-5 text-sky-600" />
                      ) : (
                        <Layers className="h-5 w-5 text-slate-500" />
                      )}
                    </div>
                    <p className="text-xs font-extrabold text-slate-900">
                      {bay.contentTitle}
                    </p>
                    {bay.subText && (
                      <p className="text-[11px] text-slate-500 font-medium">
                        {bay.subText}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-semibold text-slate-600">
                  <span>{bay.ambientTemp}</span>
                  <span
                    className={
                      isReserved ? 'text-sky-600 font-bold' : 'text-emerald-600'
                    }
                  >
                    {bay.footerStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
