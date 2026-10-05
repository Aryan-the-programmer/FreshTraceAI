'use client';

import React from 'react';

export const DualStreamChart: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      {/* Title & Stream Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
          Dual Stream: Relative Humidity & Ethylene Gas Accumulation
        </h3>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-sky-600"></span>
            <span className="text-sky-900">Humidity (72% steady)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-indigo-900 border-t border-dashed border-indigo-900"></span>
            <span className="text-indigo-950 font-bold">
              Ethylene Gas (0.18 → 0.31 ppm)
            </span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-4 space-y-3">
        <div className="h-32 w-full relative">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 800 100"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            <line x1="0" y1="20" x2="800" y2="20" stroke="#f1f5f9" strokeDasharray="4 4" />
            <line x1="0" y1="50" x2="800" y2="50" stroke="#f1f5f9" strokeDasharray="4 4" />
            <line x1="0" y1="80" x2="800" y2="80" stroke="#e2e8f0" strokeDasharray="4 4" />

            {/* Relative Humidity Stream (Solid Blue Line constant at 72%) */}
            <path
              d="M 0 50 L 400 49 L 600 50 L 800 50"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
            />

            {/* Ethylene Gas Stream (Dotted Indigo Line gently rising 0.18 -> 0.31 ppm) */}
            <path
              d="M 0 85 Q 300 83, 500 80 T 700 70 L 800 65"
              fill="none"
              stroke="#312e81"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />
          </svg>
        </div>

        {/* Bottom Details Footer Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-200 gap-2">
          <span>08:00 AM (Origin Harvest)</span>
          <span>Ambient RH: 72% - Ethylene: 0.18 ppm</span>
          <span className="font-semibold text-slate-800">
            Current: 72% - Ethylene: 0.31 ppm (Biochemical Output Low)
          </span>
        </div>
      </div>
    </div>
  );
};
