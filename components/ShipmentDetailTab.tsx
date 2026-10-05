'use client';

import React from 'react';
import Image from 'next/image';
import { Shipment, TelemetryPoint, RelayNode } from '@/types/telemetry';
import { TemperatureStreamChart } from './Charts/TemperatureStreamChart';
import { DualStreamChart } from './Charts/DualStreamChart';
import { RelayNetworkSection } from './RelayNetworkSection';
import { ActiveShipmentsTable } from './ActiveShipmentsTable';
import {
  Download,
  Share2,
  Sliders,
  CheckCircle,
  Truck,
  Sparkles,
  Thermometer,
  Droplets,
  Wind,
  Clock,
  ShieldCheck,
  Radio,
  ArrowLeft,
} from 'lucide-react';

interface ShipmentDetailTabProps {
  shipment: Shipment;
  telemetry: TelemetryPoint[];
  relayNodes: RelayNode[];
  allShipments: Shipment[];
  onBack: () => void;
  onSelectShipment: (id: string) => void;
}

export const ShipmentDetailTab: React.FC<ShipmentDetailTabProps> = ({
  shipment,
  telemetry,
  relayNodes,
  allShipments,
  onBack,
  onSelectShipment,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Navigation Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Overview</span>
      </button>

      {/* Shipment Header Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5">
            {/* Badges Row */}
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Shipment {shipment.id}
              </h1>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-0.5 text-xs font-extrabold text-sky-800">
                <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse"></span>
                IN TRANSIT
              </span>

              {shipment.blockNumber && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-0.5 text-xs font-mono font-semibold text-slate-600 border border-slate-200">
                  <CheckCircle className="h-3.5 w-3.5 text-sky-600" />
                  Block {shipment.blockNumber}
                </span>
              )}
            </div>

            {/* Subtitles */}
            <p className="text-sm font-bold text-slate-800">
              {shipment.cargoType}{' '}
              <span className="font-normal text-slate-500">
                ({shipment.weight})
              </span>
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
              <span>{shipment.route}</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="font-bold text-slate-700">{shipment.eta}</span>
            </div>
          </div>

          {/* Action Buttons Top Right */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs">
              <Download className="h-4 w-4 text-slate-500" />
              <span>Download Receipt</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs">
              <Share2 className="h-4 w-4 text-slate-500" />
              <span>Wholesaler Pass</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition cursor-pointer shadow-xs">
              <Sliders className="h-4 w-4 text-sky-400" />
              <span>Configure Sensors</span>
            </button>
          </div>
        </div>
      </div>

      {/* Truck Cargo Photo & AI Synthesis Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Reefer Truck Card (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-12">
            {/* Image Container */}
            <div className="sm:col-span-5 relative h-48 sm:h-auto min-h-[160px] bg-slate-900">
              <Image
                src="/images/reefer_apples.jpg"
                alt="Reefer Cargo Apples"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white">
                <span className="text-[10px] font-mono text-slate-300 block">
                  LOT {shipment.lotNumber}
                </span>
                <span className="text-xs font-extrabold block">
                  {shipment.grade}
                </span>
              </div>
            </div>

            {/* Truck Info Details */}
            <div className="sm:col-span-7 p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    REEFER TRUCK {shipment.assignedTruck}
                  </span>
                  <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-700 border border-sky-100">
                    GPS Live
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900">
                  Driver: {shipment.driver} · Carrier: {shipment.carrier}
                </h3>

                {/* Details grid */}
                <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-50 p-2 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Speed</span>
                    <span className="font-extrabold text-slate-900">
                      {shipment.speed}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Reefer Unit</span>
                    <span className="font-extrabold text-sky-700 truncate block">
                      {shipment.reeferUnit}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Tamper Seal</span>
                    <span className="font-extrabold text-slate-900 truncate block">
                      {shipment.tamperSeal}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 pt-2 border-t border-slate-100">
                <span>Last Telemetry Sync: {shipment.lastSync}</span>
                <span className="text-sky-600 font-semibold">
                  Auto-refresh active (30s)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Dynamic Synthesis Card (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  AI Dynamic Synthesis
                </h3>
              </div>
              <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-700">
                {shipment.aiSynthesis?.version || 'FRESHNET 4.2'}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {shipment.aiSynthesis?.summary}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              {shipment.aiSynthesis?.recommendation}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Degradation Acceleration:
            </span>
            <span className="text-xs font-extrabold text-red-600">
              {shipment.aiSynthesis?.degradationAcceleration}
            </span>
          </div>
        </div>
      </div>

      {/* 6 Metric Gauge Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. TEMPERATURE */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="uppercase tracking-wider">TEMPERATURE</span>
            <Thermometer className="h-4 w-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {shipment.temperatureMetric?.current || '5.2°C'}
          </div>
          {/* Sparkline line */}
          <div className="h-6 w-full pt-1">
            <svg className="w-full h-full" viewBox="0 0 100 25">
              <path
                d="M 0 18 Q 30 18, 50 8 T 80 18 L 100 18"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="rounded bg-sky-100 px-1.5 py-0.5 font-bold text-sky-800">
              {shipment.temperatureMetric?.status || 'Normal'}
            </span>
            <span className="font-bold text-red-500">
              {shipment.temperatureMetric?.trend || 'Δ +0.2°C/hr'}
            </span>
          </div>
        </div>

        {/* 2. HUMIDITY */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="uppercase tracking-wider">HUMIDITY</span>
            <Droplets className="h-4 w-4 text-sky-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">
              {shipment.humidityMetric?.current || '72%'}
            </span>
            <span className="text-[10px] font-semibold text-slate-400">
              Opt: {shipment.humidityMetric?.targetRange || '70-85%'}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-sky-500 rounded-full w-[72%]"></div>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="rounded bg-sky-100 px-1.5 py-0.5 font-bold text-sky-800">
              {shipment.humidityMetric?.status || 'Optimal'}
            </span>
            <span className="text-slate-500 font-semibold">
              {shipment.humidityMetric?.trend || 'Steady'}
            </span>
          </div>
        </div>

        {/* 3. ETHYLENE GAS */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="uppercase tracking-wider">ETHYLENE GAS</span>
            <Wind className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {shipment.ethyleneMetric?.current || '0.31 ppm'}
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-indigo-900 rounded-full w-[62%]"></div>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-500 font-semibold">
              {shipment.ethyleneMetric?.threshold || '< 0.50 Threshold'}
            </span>
            <span className="rounded bg-indigo-100 px-1.5 py-0.5 font-bold text-indigo-800">
              {shipment.ethyleneMetric?.status || 'Safe'}
            </span>
          </div>
        </div>

        {/* 4. AI SHELF-LIFE */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="uppercase tracking-wider">AI SHELF-LIFE</span>
            <Clock className="h-4 w-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {shipment.aiShelfLifeMetric?.current || '6.4 Days'}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            {shipment.aiShelfLifeMetric?.harvestBase || 'Base 8.0d at harvest'}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="font-bold text-sky-600">Predicted</span>
            <span className="font-bold text-red-500">
              {shipment.aiShelfLifeMetric?.predictedLoss || '-1.6d'}
            </span>
          </div>
        </div>

        {/* 5. SPOILAGE RISK */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="uppercase tracking-wider">SPOILAGE RISK</span>
            <ShieldCheck className="h-4 w-4 text-sky-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">
              {shipment.spoilageRisk}%
            </span>
            <span className="text-[10px] font-bold text-sky-600">LOW</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-sky-500 rounded-full w-[23%]"></div>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-500 font-semibold">Safe Margin</span>
            <span className="text-slate-400 font-medium">&lt; 35% Acceptable</span>
          </div>
        </div>

        {/* 6. SENSOR PROBE */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="uppercase tracking-wider">SENSOR PROBE</span>
            <Radio className="h-4 w-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {shipment.sensorProbeMetric?.signal || '84%'}
          </div>
          <p className="text-[10px] text-slate-400 font-mono truncate">
            {shipment.sensorProbeMetric?.rssi || 'Dual RSSI: 4G/LoRa -68 dBm'}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="font-mono text-slate-500">
              {shipment.sensorProbeMetric?.probeId || 'Probe #SN-8841'}
            </span>
            <span className="font-bold text-sky-600">
              {shipment.sensorProbeMetric?.status || 'ONLINE'}
            </span>
          </div>
        </div>
      </div>

      {/* Continuous Telemetry Streams (Charts) */}
      <TemperatureStreamChart data={telemetry} />
      <DualStreamChart />

      {/* Shelf-Life Decay & Spoilage Risk Attribution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Shelf-Life Decay Modeling */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-800">
                FRESHNET AI ENGINE
              </span>
              <span className="text-xs font-bold text-indigo-700">
                91% Confidence
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Shelf–Life Decay Modeling
            </h3>
          </div>

          <div className="rounded-xl bg-slate-50 p-5 space-y-2 border border-slate-200">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900">6.4</span>
              <span className="text-lg font-black text-slate-900">DAYS</span>
            </div>
            <p className="text-xs font-extrabold text-slate-800">
              Estimated Remaining Freshness Window
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              Retail shelf-life guaranteed through October 20, 2024.
            </p>
          </div>
        </div>

        {/* Right: Spoilage Risk Attribution */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Spoilage Risk Attribution
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">23%</span>
                <span className="text-xs font-bold text-sky-600">SAFE RATING</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Additive degradation contribution factors
            </p>
          </div>

          {/* Factor Bars */}
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Temperature Exposure (Defrost cycle)</span>
                <span className="text-red-500">+12%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-red-400 rounded-full w-[45%]"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Ethylene Accumulation Trend</span>
                <span className="text-amber-500">+5%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[25%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store-and-Forward LoRa Relay Network */}
      <RelayNetworkSection nodes={relayNodes} />

      {/* Active Shipments Telemetry Table */}
      <ActiveShipmentsTable
        shipments={allShipments}
        onSelectShipment={onSelectShipment}
      />
    </div>
  );
};
