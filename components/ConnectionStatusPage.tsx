'use client';

import React from 'react';
import { ConnectionNode } from '@/types/telemetry';
import { Wifi, WifiOff, Radio, ArrowRight, ShieldCheck } from 'lucide-react';

interface ConnectionStatusPageProps {
  nodes: ConnectionNode[];
}

export const ConnectionStatusPage: React.FC<ConnectionStatusPageProps> = ({
  nodes,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Connection Status & Offline Resilience
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Monitor internet connectivity and long-range relay connections across all active trucks.
        </p>
      </div>

      {/* Visual Store & Forward Diagram Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-base font-black text-slate-900 tracking-tight">
          Long-Range Relay & Offline Store-and-Forward
        </h2>

        {/* 5 Step Flow Graphic */}
        <div className="rounded-xl bg-slate-900 p-6 text-white space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center font-mono text-xs">
            <div className="rounded-lg bg-slate-800 p-3 border border-slate-700 w-full sm:w-auto">
              <span className="font-bold text-white block">TRK-117</span>
              <span className="text-[10px] text-slate-400">Cell Blindspot</span>
            </div>
            <ArrowRight className="h-5 w-5 text-sky-400 rotate-90 sm:rotate-0" />
            <div className="rounded-lg bg-sky-950 p-3 border border-sky-800 text-sky-300 w-full sm:w-auto">
              <span className="font-bold block">Long-range connection</span>
              <span className="text-[10px]">Sub-GHz Radio</span>
            </div>
            <ArrowRight className="h-5 w-5 text-sky-400 rotate-90 sm:rotate-0" />
            <div className="rounded-lg bg-slate-800 p-3 border border-slate-700 w-full sm:w-auto">
              <span className="font-bold text-white block">TRK-119</span>
              <span className="text-[10px] text-slate-400">Gateway Relay</span>
            </div>
            <ArrowRight className="h-5 w-5 text-sky-400 rotate-90 sm:rotate-0" />
            <div className="rounded-lg bg-emerald-950 p-3 border border-emerald-800 text-emerald-300 w-full sm:w-auto">
              <span className="font-bold block">Internet → FreshTrace</span>
              <span className="text-[10px]">Cloud Portal</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center font-medium">
            Data can be temporarily stored and forwarded when internet connectivity returns.
          </p>
        </div>
      </div>

      {/* Truck Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nodes.map((node) => (
          <div
            key={node.truckId}
            className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">
                Truck {node.truckId}
              </h3>
              <span
                className={`rounded px-2.5 py-0.5 text-[10px] font-bold ${
                  node.internetStatus === 'Connected'
                    ? 'bg-emerald-100 text-emerald-800'
                    : node.longRangeStatus === 'Relay Active'
                    ? 'bg-sky-100 text-sky-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {node.internetStatus === 'Connected'
                  ? 'ONLINE'
                  : node.longRangeStatus === 'Relay Active'
                  ? 'RELAY ACTIVE'
                  : 'OFFLINE STORING'}
              </span>
            </div>

            <div className="text-xs space-y-1 text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Internet Connection:</span>
                <span
                  className={
                    node.internetStatus === 'Connected'
                      ? 'text-emerald-600 font-bold'
                      : 'text-red-600 font-bold'
                  }
                >
                  {node.internetStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Long-Range Connection:</span>
                <span className="font-bold text-slate-800">
                  {node.longRangeStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Stored Records:</span>
                <span className="font-bold text-slate-900">
                  {node.storedRecordsCount} frames
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
