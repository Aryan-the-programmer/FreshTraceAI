'use client';

import React from 'react';
import {
  Truck,
  Sparkles,
  ShieldAlert,
  Wifi,
  CheckCircle2,
  FileSearch,
  ArrowRight,
  ChevronRight,
  Thermometer,
  ShieldCheck,
  Building,
  Boxes,
  Zap,
} from 'lucide-react';
import { UserRole } from '@/types/telemetry';

interface LandingPageProps {
  onGetStarted: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onSelectRole,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-3.5 py-1 text-xs font-bold text-sky-700">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" />
              <span>Smarter food logistics.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
              Know the condition of your food.{' '}
              <span className="text-sky-600">Before it arrives.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
              FreshTrace combines smart sensors, long-range connectivity and AI predictions to help you monitor shipments, reduce spoilage and verify every step of the journey.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-extrabold text-white hover:bg-slate-800 transition cursor-pointer shadow-md active:scale-95"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 text-sky-400" />
              </button>
              <button
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-xs"
              >
                <span>See How It Works</span>
              </button>
            </div>

            {/* Quick Role Jump */}
            <div className="pt-4 flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span>Quick Login Demo:</span>
              <button
                onClick={() => onSelectRole('fleet_owner')}
                className="text-sky-600 font-bold hover:underline cursor-pointer"
              >
                Fleet Owner Portal →
              </button>
              <button
                onClick={() => onSelectRole('wholesaler')}
                className="text-sky-600 font-bold hover:underline cursor-pointer"
              >
                Wholesaler Portal →
              </button>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    SHIPMENT SH-1024
                  </span>
                </div>
                <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-mono text-sky-300 border border-sky-500/30">
                  IN TRANSIT
                </span>
              </div>

              {/* Visual Card Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-slate-800/80 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Temperature
                  </span>
                  <span className="text-xl font-black text-white">5.2°C</span>
                  <span className="text-[10px] font-bold text-emerald-400 block">
                    Normal Operating Range
                  </span>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    AI Shelf Life
                  </span>
                  <span className="text-xl font-black text-sky-400">6.4 Days</span>
                  <span className="text-[10px] font-bold text-slate-300 block">
                    Remaining Freshness
                  </span>
                </div>
              </div>

              {/* Truck Route Visual Bar */}
              <div className="rounded-xl bg-slate-800/80 p-4 space-y-3 border border-slate-700/60">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Nashik Farm</span>
                  <span className="text-sky-400 font-mono">TRK-104 (62 km/h)</span>
                  <span>Raipur Warehouse</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden relative">
                  <div className="h-full bg-sky-400 rounded-full w-[65%]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Departed: 08:00 AM</span>
                  <span>ETA: Today 04:30 PM</span>
                </div>
              </div>

              {/* Integrity status */}
              <div className="flex items-center justify-between text-xs font-medium text-slate-300 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  Records Verified
                </span>
                {/* <span className="font-mono text-slate-400">LoRa Gateway Active</span> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
            COMPLETE PLATFORM CAPABILITIES
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Everything you need to protect every shipment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 font-bold">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Live Truck Tracking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              See where your shipments are and monitor their condition in real time across all transit routes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">AI Shelf Life Prediction</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Know how much useful shelf life is left before the shipment arrives at its final destination using our trained ml models.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 font-bold">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Spoilage Risk Warnings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get early warnings when shipment conditions could lead to quality loss or biological degradation.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold">
              <Wifi className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Offline & Long Range Connectivity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Keep collecting shipment data even when internet connectivity is temporarily unavailable.
            </p>
          </div>

          {/* Card 5 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 font-bold">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Trusted Shipment Records</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verify that important shipment records have not been changed during transit.
            </p>
          </div>

          {/* Card 6 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
              <FileSearch className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Complete Traceability</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Follow the complete journey of your food products from farm origin to destination warehouse.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
              5-STEP WORKFLOW
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              How FreshTrace Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Sensors collect shipment conditions', desc: 'Temperature, humidity, ethylene, and location recorded continuously.' },
              { num: '02', title: 'Data is securely recorded', desc: 'Readings are stored locally with secure fingerprints.' },
              { num: '03', title: 'Long-range connection keeps data moving', desc: 'Sub-GHz radio bridges cellular blindspots reliably.' },
              { num: '04', title: 'AI analyzes shipment & predicts risk', desc: 'Calculates remaining shelf life and quality score.' },
              { num: '05', title: 'Verified records give confidence', desc: 'Wholesalers verify condition before accepting cargo.' },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-2xl bg-white p-5 border border-slate-200 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-sky-600 block">
                    {step.num}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-2">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Landing Page AI Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
              PREDICTIVE INTELLIGENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Predict problems before they become losses.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              FreshTrace analyzes temperature, humidity, gas levels and shipment history to estimate how long the product is likely to remain in good condition.
            </p>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl bg-slate-900 p-5 text-white">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  Remaining Shelf Life
                </span>
                <span className="text-2xl font-black text-white">6.4 days</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  Spoilage Risk
                </span>
                <span className="text-2xl font-black text-sky-400">23%</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  Prediction Confidence
                </span>
                <span className="text-2xl font-black text-emerald-400">91%</span>
              </div>
            </div>
          </div>

          {/* Sample Shipment Card */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Fresh Apples</h3>
                <span className="text-xs font-mono text-slate-500">Shipment SH-1024</span>
              </div>
              {/* <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
                AI Verified
              </span> */}
            </div>

            {/* Risk Chart Graphic */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700">
                Freshness Decay Curve vs Transit Exposure
              </span>
              <div className="h-36 w-full rounded-xl bg-slate-50 p-3 border border-slate-200 relative">
                <svg className="w-full h-full" viewBox="0 0 300 80">
                  <path
                    d="M 0 20 Q 100 22, 150 50 T 300 65"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="3"
                  />
                  <circle cx="150" cy="50" r="4" fill="#dc2626" />
                </svg>
                <div className="absolute top-2 right-4 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  Defrost Excursion Resolved
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Page Trust Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
              TRUSTED SHIPMENT RECORDS
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Every shipment has a story. Make it verifiable.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Important shipment events are securely recorded so authorized users can verify that the history has not been changed.
            </p>
          </div>

          {/* 4 Stage Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            {[
              { title: 'Farm', desc: 'Harvest & Initial Cooling' },
              { title: 'Cold Storage', desc: 'Vault Staging & Temp Control' },
              { title: 'Truck', desc: 'Reefer Transit Monitoring' },
              { title: 'Wholesaler', desc: 'Verified Delivery Acceptance' },
            ].map((stage, idx) => (
              <div
                key={stage.title}
                className="rounded-xl bg-slate-800 p-5 border border-slate-700 space-y-2 relative"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white font-extrabold text-xs">
                  {idx + 1}
                </span>
                <h3 className="text-base font-extrabold text-white">{stage.title}</h3>
                <p className="text-xs text-slate-400">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 text-center max-w-4xl mx-auto px-6 space-y-6">
        <h2 className="text-3xl font-black text-slate-900">
          Ready to experience FreshTrace?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onSelectRole('fleet_owner')}
            className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition cursor-pointer"
          >
            Enter Fleet Owner Demo
          </button>
          <button
            onClick={() => onSelectRole('wholesaler')}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Enter Wholesaler Demo
          </button>
        </div>
      </section>
    </div>
  );
};
