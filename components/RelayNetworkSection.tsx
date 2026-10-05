'use client';

import React from 'react';
import { RelayNode } from '@/types/telemetry';
import { Signal, Wifi, Cloud, ShieldAlert } from 'lucide-react';

interface RelayNetworkSectionProps {
  nodes: RelayNode[];
}

export const RelayNetworkSection: React.FC<RelayNetworkSectionProps> = ({
  nodes,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-sky-600 uppercase">
            RESILIENT MESH ARCHITECTURE
          </span>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Store-and-Forward LoRa Relay Network
          </h2>
        </div>
        <div className="self-start sm:self-auto rounded-lg bg-slate-100 px-3 py-1 text-xs font-mono text-slate-600 border border-slate-200">
          Mesh Protocol: Sub-GHz 868MHz // 128-bit AES
        </div>
      </div>

      {/* 3 Node Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nodes.map((node) => {
          const isError = node.statusType === 'error';
          const isPrimary = node.statusType === 'primary';
          const isSuccess = node.statusType === 'success';

          return (
            <div
              key={node.id}
              className={`rounded-xl border p-4 flex flex-col justify-between space-y-3 transition ${
                isError
                  ? 'border-red-100 bg-red-50/20 hover:border-red-200'
                  : isPrimary
                  ? 'border-sky-100 bg-sky-50/20 hover:border-sky-200'
                  : 'border-emerald-100 bg-emerald-50/20 hover:border-emerald-200'
              }`}
            >
              <div className="space-y-2">
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
                      isError
                        ? 'bg-red-100 text-red-700'
                        : isPrimary
                        ? 'bg-sky-100 text-sky-700'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {node.tag}
                  </span>

                  {node.icon === 'cell' && (
                    <div className="rounded-md bg-red-100 p-1 text-red-600">
                      <ShieldAlert className="h-4 w-4" />
                    </div>
                  )}
                  {node.icon === 'wifi' && (
                    <div className="rounded-md bg-sky-100 p-1 text-sky-600">
                      <Wifi className="h-4 w-4" />
                    </div>
                  )}
                  {node.icon === 'cloud' && (
                    <div className="rounded-md bg-slate-100 p-1 text-slate-700">
                      <Cloud className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Truck ID / Title */}
                <h3 className="text-sm font-bold text-slate-900">
                  {node.truckId}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {node.description}
                </p>
              </div>

              {/* Status Bar Pill */}
              <div className="pt-2 border-t border-slate-100">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold border border-slate-200 text-slate-800 shadow-2xs">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isError
                        ? 'bg-red-500 animate-pulse'
                        : isPrimary
                        ? 'bg-sky-500'
                        : 'bg-emerald-500'
                    }`}
                  ></span>
                  <span>{node.statusBadge}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
