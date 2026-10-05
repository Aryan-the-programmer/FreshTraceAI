'use client';

import React from 'react';
import { Shipment } from '@/types/telemetry';
import { Download, SlidersHorizontal, ChevronRight, AlertCircle } from 'lucide-react';

interface ActiveShipmentsTableProps {
  shipments: Shipment[];
  onSelectShipment?: (id: string) => void;
}

export const ActiveShipmentsTable: React.FC<ActiveShipmentsTableProps> = ({
  shipments,
  onSelectShipment,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      {/* Table Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Active Shipments Telemetry
          </h2>
          <p className="text-xs text-slate-500">
            Sensor readings refreshed every 30 seconds via IoT gateway
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer">
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
            <span>Corridor View</span>
          </button>
        </div>
      </div>

      {/* Table Component */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4">SHIPMENT ID</th>
              <th className="py-3 px-4">CARGO TYPE</th>
              <th className="py-3 px-4">ASSIGNED TRUCK</th>
              <th className="py-3 px-4">CHAMBER TEMP</th>
              <th className="py-3 px-4">REMAINING SHELF LIFE</th>
              <th className="py-3 px-4">SPOILAGE RISK</th>
              <th className="py-3 px-4">NETWORK SYNC</th>
              <th className="py-3 px-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {shipments.map((shipment) => {
              const isOffline = shipment.networkSync?.includes('Offline') || shipment.status === 'Delayed';
              const isWarning = shipment.networkSync === 'Warning' || shipment.riskLevel === 'High';

              return (
                <tr
                  key={shipment.id}
                  onClick={() => onSelectShipment?.(shipment.id)}
                  className={`hover:bg-slate-50 transition cursor-pointer ${
                    isOffline ? 'bg-red-50/30' : ''
                  }`}
                >
                  {/* Shipment ID */}
                  <td className="py-3.5 px-4 font-bold text-sky-600 hover:underline">
                    {shipment.id}
                  </td>

                  {/* Cargo Type */}
                  <td className="py-3.5 px-4 text-slate-900 font-semibold">
                    {shipment.cargoType}
                  </td>

                  {/* Assigned Truck */}
                  <td
                    className={`py-3.5 px-4 font-bold ${
                      isOffline ? 'text-red-700' : 'text-slate-700'
                    }`}
                  >
                    {shipment.assignedTruck}
                  </td>

                  {/* Chamber Temp */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-bold ${
                        isOffline
                          ? 'text-red-600'
                          : isWarning
                          ? 'text-amber-600'
                          : 'text-slate-900'
                      }`}
                    >
                      {shipment.chamberTemp}
                    </span>
                    {shipment.tempTrend && (
                      <span
                        className={`block text-[11px] font-semibold ${
                          shipment.tempTrend.includes('+')
                            ? 'text-red-500'
                            : 'text-emerald-600'
                        }`}
                      >
                        {shipment.tempTrend}
                      </span>
                    )}
                  </td>

                  {/* Remaining Shelf Life */}
                  <td
                    className={`py-3.5 px-4 font-bold ${
                      isWarning
                        ? 'text-amber-600'
                        : isOffline
                        ? 'text-red-600'
                        : 'text-slate-800'
                    }`}
                  >
                    {shipment.remainingShelfLife}
                  </td>

                  {/* Spoilage Risk Progress Bar */}
                  <td className="py-3.5 px-4 w-44">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            shipment.spoilageRisk > 50
                              ? 'bg-red-500'
                              : shipment.spoilageRisk > 30
                              ? 'bg-amber-500'
                              : 'bg-sky-500'
                          }`}
                          style={{ width: `${shipment.spoilageRisk}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700 w-8 text-right">
                        {shipment.spoilageRisk}%
                      </span>
                    </div>
                  </td>

                  {/* Network Sync */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold ${
                        shipment.networkSync === 'On Track'
                          ? 'bg-sky-100 text-sky-800'
                          : isWarning
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          shipment.networkSync === 'On Track'
                            ? 'bg-sky-500'
                            : isWarning
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                      ></span>
                      {shipment.networkSync || shipment.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    {isOffline ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 font-extrabold text-sm">
                        !
                      </span>
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400 mx-auto hover:text-slate-700" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
