'use client';

import React from 'react';
import { Truck, Store, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { UserRole } from '@/types/telemetry';

interface LoginPageProps {
  onSelectRole: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-4xl w-full space-y-8 text-center">
        {/* Header Branding */}
        <div className="space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sky-400 shadow-md">
            <Cpu className="h-6 w-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Welcome to FreshTrace
          </h1>
          <p className="text-base text-slate-600 font-medium">
            Choose how you use FreshTrace.
          </p>
        </div>

        {/* 2 Primary Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* FLEET OWNER CARD */}
          <div
            onClick={() => onSelectRole('fleet_owner')}
            className="group rounded-2xl border-2 border-slate-200 bg-white p-8 space-y-5 hover:border-slate-900 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white font-bold group-hover:scale-105 transition">
                <Truck className="h-6 w-6 text-sky-400" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  ROLE 1
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  FLEET OWNER
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Monitor your trucks, shipments and delivery conditions across your transit fleet in real time.
              </p>
            </div>

            <div className="pt-4">
              <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-extrabold text-white group-hover:bg-slate-800 transition">
                <span>Continue as Fleet Owner</span>
                <ArrowRight className="h-4 w-4 text-sky-400" />
              </button>
            </div>
          </div>

          {/* WHOLESALER CARD */}
          <div
            onClick={() => onSelectRole('wholesaler')}
            className="group rounded-2xl border-2 border-slate-200 bg-white p-8 space-y-5 hover:border-slate-900 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white font-bold group-hover:scale-105 transition">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  ROLE 2
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  WHOLESALER
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Monitor incoming shipments, check product condition, and verify record authenticity before acceptance.
              </p>
            </div>

            <div className="pt-4">
              <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-600 py-3.5 text-sm font-extrabold text-white group-hover:bg-sky-500 transition">
                <span>Continue as Wholesaler</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Admin Role */}
        <div className="pt-4 border-t border-slate-200/80 max-w-md mx-auto space-y-2">
          <p className="text-xs text-slate-500 font-semibold">Administrator Access</p>
          <button
            onClick={() => onSelectRole('fleet_owner')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 transition underline cursor-pointer"
          >
            Manage platform system settings (Admin Mode)
          </button>
        </div>
      </div>
    </div>
  );
};
