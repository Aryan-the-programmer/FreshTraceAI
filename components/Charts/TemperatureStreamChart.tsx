'use client';

import React, { useState } from 'react';
import { TelemetryPoint } from '@/types/telemetry';
import { AlertTriangle } from 'lucide-react';

interface TemperatureStreamChartProps {
  data: TelemetryPoint[];
}

export const TemperatureStreamChart: React.FC<TemperatureStreamChartProps> = ({
  data,
}) => {
  const [timeRange, setTimeRange] = useState<'24H' | '48H' | '7D'>('24H');

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      {/* Top Header & Range Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Continuous Telemetry Streams
            </h3>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600">
              Dual Precision Probes
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Synchronized ambient temperature, relative humidity, and ethylene gas tracking across transit span.
          </p>
        </div>

        {/* Time filters */}
        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs font-semibold self-start sm:self-auto">
          {(['24H', '48H', '7D'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`rounded-md px-3 py-1 transition cursor-pointer ${
                timeRange === range
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Box */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-4 space-y-3 relative overflow-hidden">
        {/* Chart Subhead & Excursion Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs font-bold gap-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-xs bg-sky-600"></span>
            <span className="text-slate-900 font-extrabold">
              Cargo Core Temperature (°C)
            </span>
            <span className="font-mono text-slate-500 font-normal">
              Operating Band [3.0°C - 6.0°C]
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-red-600 font-bold">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
            <span>● 1 Thermal Excursion Recorded</span>
          </div>
        </div>

        {/* Interactive Temperature Excursion Canvas Chart */}
        <div className="relative h-64 w-full pt-4">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 800 220"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Safe Band Light Blue Fill */}
              <linearGradient id="safeBandGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.4" />
              </linearGradient>

              {/* Excursion Red Shadow Fill */}
              <linearGradient id="excursionGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#fee2e2" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="20" x2="800" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="0" y1="80" x2="800" y2="80" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="0" y1="140" x2="800" y2="140" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Safe Band Rectangle (3.0°C to 6.0°C corresponding to Y=140 to Y=60) */}
            <rect
              x="0"
              y="60"
              width="800"
              height="80"
              fill="url(#safeBandGradient)"
              rx="4"
            />

            {/* Excursion Highlight Vertical Area (12:45 PM region) */}
            <path
              d="M 480 140 L 480 30 L 550 85 L 550 140 Z"
              fill="url(#excursionGlow)"
            />

            {/* Safe Limit Text Labels */}
            <text x="10" y="52" fill="#0284c7" fontSize="11" fontWeight="bold">
              Safe Upper Limit (6.0°C)
            </text>
            <text x="10" y="155" fill="#0284c7" fontSize="11" fontWeight="bold">
              Safe Lower Limit (3.0°C)
            </text>

            {/* Main Temperature Line Path */}
            {/* 08:00 (X=0, Y=125) -> 10:00 (X=200, Y=128) -> 12:00 (X=400, Y=115) -> 12:45 Defrost Peak (X=500, Y=30) -> 01:10 (X=550, Y=85) -> 02:00 (X=620, Y=85) -> 04:30 (X=800, Y=85) */}
            <path
              d="M 0 125 Q 100 127, 200 128 T 400 115 L 480 110 L 515 30 L 550 85 L 620 85 L 800 85"
              fill="none"
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* End Point Circle */}
            <circle cx="800" cy="85" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />

            {/* Peak Excursion Point */}
            <circle cx="515" cy="30" r="4.5" fill="#dc2626" />
          </svg>

          {/* Excursion Annotation Tooltip Box (Floating Callout Card) */}
          <div className="absolute top-1 left-[45%] md:left-[52%] max-w-xs -translate-x-1/2 rounded-lg border border-red-200 bg-white p-3 shadow-lg z-10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-600">
              <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
              <span>12:45 PM Defrost Excursion</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-tight">
              Peaked at <strong className="text-slate-900">7.2°C</strong> (25m duration) during automatic cycle. Cargo normalized to <strong className="text-slate-900">5.2°C</strong> at 01:10 PM.
            </p>
          </div>
        </div>

        {/* X-Axis Timestamps */}
        <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-200/80">
          <span>08:00 AM (Pickup)</span>
          <span>10:00 AM</span>
          <span>12:00 PM</span>
          <span className="font-bold text-slate-900">12:45 PM Defrost</span>
          <span>02:00 PM</span>
          <span>04:30 PM (ETA Dest.)</span>
        </div>
      </div>
    </div>
  );
};
