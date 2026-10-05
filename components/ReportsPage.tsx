'use client';

import React, { useState } from 'react';
import { Download, SlidersHorizontal, BarChart3, TrendingUp, Calendar } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7 Days' | '30 Days' | '90 Days'>('30 Days');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Reports & Performance Analytics
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Analyze cold-chain performance trends, temperature compliance, and delivery quality.
            </p>
          </div>

          {/* Date range filters */}
          <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 p-1 text-xs font-semibold self-start sm:self-auto">
            {(['7 Days', '30 Days', '90 Days'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`rounded-full px-3.5 py-1 transition cursor-pointer ${
                  dateRange === range
                    ? 'bg-slate-900 text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Performance KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Average Temperature
            </span>
            <div className="text-2xl font-black text-slate-900">4.8°C</div>
            <span className="text-[11px] font-bold text-emerald-600 block">
              Within 3.0°C - 6.0°C Target
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              On-Time Deliveries
            </span>
            <div className="text-2xl font-black text-slate-900">96.4%</div>
            <span className="text-[11px] font-bold text-emerald-600 block">
              +1.2% vs last month
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Spoilage Avoidance
            </span>
            <div className="text-2xl font-black text-sky-600">$14,288</div>
            <span className="text-[11px] font-bold text-slate-500 block">
              Weekly Saved Value
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Offline Duration Avg
            </span>
            <div className="text-2xl font-black text-slate-900">18 mins</div>
            <span className="text-[11px] font-bold text-slate-500 block">
              100% Data Recovered
            </span>
          </div>
        </div>
      </div>

      {/* Spoilage Risk Trends Chart Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-black text-slate-900 tracking-tight">
            Spoilage Risk & Temperature Performance Trends ({dateRange})
          </h2>
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer">
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Report PDF</span>
          </button>
        </div>

        {/* Chart Graphic */}
        <div className="h-64 w-full rounded-xl bg-slate-50 p-4 border border-slate-200 relative">
          <svg className="w-full h-full" viewBox="0 0 600 160">
            <line x1="0" y1="40" x2="600" y2="40" stroke="#cbd5e1" strokeDasharray="3 3" />
            <line x1="0" y1="100" x2="600" y2="100" stroke="#cbd5e1" strokeDasharray="3 3" />
            <path
              d="M 0 120 Q 150 110, 300 60 T 600 90"
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
            />
            <path
              d="M 0 140 Q 200 135, 400 120 T 600 130"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          </svg>
          <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-200">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};
