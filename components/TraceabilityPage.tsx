'use client';

import React from 'react';
import { JourneyStage } from '@/types/telemetry';
import { CheckCircle2, MapPin, Truck, Building, Store, ShieldCheck } from 'lucide-react';

interface TraceabilityPageProps {
  stages: JourneyStage[];
}

export const TraceabilityPage: React.FC<TraceabilityPageProps> = ({ stages }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Complete Traceability — Shipment Journey
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Follow the verified journey of your food shipment from origin harvest to warehouse destination.
        </p>
      </div>

      {/* Journey Timeline Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Shipment SH-1024 Journey Record
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Product: Fresh Apples (2,400 kg)
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-100">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Record History Verified</span>
          </span>
        </div>

        {/* 5 Stages Grid / Timeline */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
          {stages.map((stage) => {
            const isVerified = stage.verificationStatus === 'Verified';

            return (
              <div key={stage.step} className="relative flex items-start gap-4 pl-2">
                {/* Step Circle */}
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold shrink-0 z-10 ${
                    isVerified
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-600 border border-slate-300'
                  }`}
                >
                  {stage.step}
                </div>

                {/* Stage Detail Box */}
                <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-1 hover:bg-slate-50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {stage.title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                        isVerified ? 'text-emerald-700' : 'text-slate-500'
                      }`}
                    >
                      {isVerified && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                      {stage.verificationStatus}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-bold">
                    {stage.location}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Timestamp: {stage.time}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 text-xs font-semibold text-slate-700">
                    Condition: <span className="text-slate-900">{stage.condition}</span>
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
