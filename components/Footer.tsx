'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, ShieldCheck, Heart } from 'lucide-react';
import { UserRole } from '@/types/telemetry';

interface FooterProps {
  onSelectRole?: (role: UserRole) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectRole }) => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 font-sans pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sky-400 shadow-md">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight text-slate-900 leading-none">
                  FreshTrace
                </h3>
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  Smarter Food Logistics
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-medium">
              FreshTrace combines smart sensors, long-range connectivity, and AI predictions to help monitor food shipments, reduce spoilage, and verify every step of the transit journey.
            </p>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Commercial Cold-Chain Integrity Verified</span>
            </div>
          </div>

          {/* Quick Platform Portals */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">
              Platform Experience
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={() => onSelectRole?.('landing')}
                  className="hover:text-slate-900 cursor-pointer transition"
                >
                  Platform Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectRole?.('fleet_owner')}
                  className="hover:text-slate-900 cursor-pointer transition"
                >
                  Fleet Owner Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectRole?.('wholesaler')}
                  className="hover:text-slate-900 cursor-pointer transition"
                >
                  Wholesaler Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectRole?.('login')}
                  className="hover:text-slate-900 cursor-pointer transition"
                >
                  Role Selection Login
                </button>
              </li>
            </ul>
          </div>

          {/* Core Capabilities */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">
              Technology & Features
            </h4>
            <ul className="space-y-2 font-medium text-slate-500">
              <li>Live Fleet & Transit Tracking</li>
              <li>AI Shelf-Life & Spoilage Prediction</li>
              <li>Record Verification & Fingerprint Proof</li>
              <li>Offline Store-and-Forward Long-Range Mesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-slate-400">
          <p>© {new Date().getFullYear()} FreshTrace. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for cold-chain safety.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
