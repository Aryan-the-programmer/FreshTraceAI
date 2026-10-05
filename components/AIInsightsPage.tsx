'use client';

import React from 'react';
import { RiskFactor } from '@/types/telemetry';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface AIInsightsPageProps {
  remainingShelfLife: string;
  spoilageRisk: number;
  confidence: string;
  factors: RiskFactor[];
  onNavigateToShipment?: () => void;
}

export const AIInsightsPage: React.FC<AIInsightsPageProps> = ({
  remainingShelfLife = '6.4 days',
  spoilageRisk = 23,
  confidence = '91%',
  factors,
  onNavigateToShipment,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            AI Shipment Insights
          </h1>
        </div>
        <p className="text-xs text-slate-600 font-medium max-w-2xl leading-relaxed">
          FreshTrace analyzes shipment conditions and historical patterns to estimate remaining shelf life and spoilage risk.
        </p>
      </div>

      {/* Top 3 AI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Remaining Shelf Life */}
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Remaining Shelf Life
          </span>
          <div className="text-3xl font-black text-white">{remainingShelfLife}</div>
          <p className="text-xs text-slate-300 font-medium">Estimated window</p>
        </div>

        {/* Spoilage Risk */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Spoilage Risk
          </span>
          <div className="text-3xl font-black text-sky-600">{spoilageRisk}%</div>
          <p className="text-xs text-slate-500 font-medium">Safe Margin (&lt; 35%)</p>
        </div>

        {/* Prediction Confidence */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Prediction Confidence
          </span>
          <div className="text-3xl font-black text-emerald-600">{confidence}</div>
          <p className="text-xs text-slate-500 font-medium">High Accuracy Index</p>
        </div>
      </div>

      {/* Why is the risk 23%? Factor Breakdown */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-black text-slate-900 tracking-tight">
          Why is the risk {spoilageRisk}%?
        </h2>

        <div className="space-y-3">
          {factors.map((f, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-slate-900">{f.factor}</h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {f.description}
                </p>
              </div>
              <span
                className={`rounded px-2.5 py-1 text-xs font-mono font-extrabold shrink-0 ${
                  f.impact === '0%'
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {f.impact}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendation Box */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <h2 className="text-base font-extrabold text-emerald-900">
            AI Recommendation
          </h2>
        </div>
        <p className="text-xs font-semibold text-emerald-800 leading-relaxed">
          Shipment is currently in good condition. Continue monitoring temperature during the remaining journey.
        </p>
      </div>
    </div>
  );
};
