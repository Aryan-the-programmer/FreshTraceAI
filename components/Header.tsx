'use client';

import React from 'react';
import { Cpu, Search, Bell, User, LogOut, ShieldCheck } from 'lucide-react';
import { UserRole } from '@/types/telemetry';

interface HeaderProps {
  currentRole: UserRole;
  onRoleSwitch: (role: UserRole) => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleSwitch,
  searchQuery = '',
  onSearchChange,
}) => {
  if (currentRole === 'landing' || currentRole === 'login') {
    return (
      <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-6 md:px-12 shadow-xs">
        {/* Brand Logo */}
        <div
          onClick={() => onRoleSwitch('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sky-400 shadow-md group-hover:scale-105 transition">
            <Cpu className="h-6 w-6 text-sky-400" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">
              FreshTrace
            </h1>
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Smarter Food Logistics
            </span>
          </div>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onRoleSwitch('landing');
            }}
            className="hidden sm:inline-flex text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 cursor-pointer transition"
          >
            See How It Works
          </button>
          <button
            onClick={() => onRoleSwitch('login')}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer shadow-xs"
          >
            Platform Login
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 shadow-xs">
      {/* Brand & Active Role Selector */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => onRoleSwitch('landing')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sky-400 shadow-2xs">
            <Cpu className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-slate-900 leading-none">
              FreshTrace
            </h1>
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              {currentRole === 'fleet_owner' ? 'Fleet Owner Portal' : 'Wholesaler Portal'}
            </span>
          </div>
        </div>

        {/* Active Role Indicator Switcher */}
        <div className="hidden sm:flex items-center gap-1 rounded-full bg-slate-100 p-1 text-xs font-semibold border border-slate-200">
          <button
            onClick={() => onRoleSwitch('fleet_owner')}
            className={`rounded-full px-3 py-1 transition cursor-pointer ${currentRole === 'fleet_owner'
                ? 'bg-slate-900 text-white shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Fleet Owner
          </button>
          <button
            onClick={() => onRoleSwitch('wholesaler')}
            className={`rounded-full px-3 py-1 transition cursor-pointer ${currentRole === 'wholesaler'
                ? 'bg-slate-900 text-white shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Wholesaler
          </button>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center gap-3 max-w-md w-full mx-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search shipments, trucks, sensors..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none transition"
          />
        </div>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-3">
        {/* Verification Shield Pill */}
        <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Records Verified</span>
        </div>

        {/* Notifications */}
        <button
          className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
        </button>

        {/* Logout / Switch Role */}
        <button
          onClick={() => onRoleSwitch('login')}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
          title="Switch Role or Exit"
        >
          <LogOut className="h-3.5 w-3.5 text-slate-500" />
          <span className="hidden sm:inline">Exit Demo</span>
        </button>
      </div>
    </header>
  );
};
