'use client';

import React, { useState } from 'react';
import { VerificationRecord } from '@/types/telemetry';
import { ShieldCheck, CheckCircle2, FileText, ArrowRight, Lock, Key, Info, X } from 'lucide-react';

interface RecordVerificationPageProps {
  record: VerificationRecord;
}

export const RecordVerificationPage: React.FC<RecordVerificationPageProps> = ({
  record,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Shipment Record Verification
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Check that important shipment records have not been changed.
        </p>
      </div>

      {/* Hero Status Banner */}
      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-xl space-y-4 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white font-extrabold text-base">
              ✓
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                ✓ RECORDS VERIFIED
              </span>
              <h2 className="text-xl font-black text-white">
                Shipment {record.shipmentId}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-500 transition cursor-pointer self-start sm:self-auto"
          >
            <Info className="h-4 w-4" />
            <span>How verification works</span>
          </button>
        </div>

        {/* 4 Integrity Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
          <div className="rounded-xl bg-slate-800/80 p-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">
              Data Batches
            </span>
            <span className="text-2xl font-black text-white">{record.batchesRecorded}</span>
          </div>
          <div className="rounded-xl bg-slate-800/80 p-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">
              Verified
            </span>
            <span className="text-2xl font-black text-emerald-400">{record.batchesVerified}</span>
          </div>
          <div className="rounded-xl bg-slate-800/80 p-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">
              Issues Found
            </span>
            <span className="text-2xl font-black text-slate-300">{record.issuesFound}</span>
          </div>
          <div className="rounded-xl bg-slate-800/80 p-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">
              Integrity
            </span>
            <span className="text-2xl font-black text-emerald-400">{record.integrityPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Verification Visualization Flow */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <h2 className="text-base font-black text-slate-900 tracking-tight">
          Record Fingerprint Verification Flow
        </h2>

        {/* 4 Step Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block">STEP 1</span>
            <h3 className="text-xs font-black text-slate-900">SENSOR RECORD</h3>
            <p className="text-[11px] text-slate-500 font-mono">5.2°C @ 04:15 PM</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block">STEP 2</span>
            <h3 className="text-xs font-black text-slate-900">SECURE FINGERPRINT</h3>
            <p className="text-[11px] text-slate-500 font-mono truncate">{record.fingerprint}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block">STEP 3</span>
            <h3 className="text-xs font-black text-slate-900">VERIFIED RECORD</h3>
            <p className="text-[11px] text-slate-500 font-mono truncate">{record.storedVerification}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200 space-y-1">
            <span className="text-[10px] font-bold text-emerald-600 block">RESULT</span>
            <h3 className="text-xs font-black text-emerald-900">✓ MATCH</h3>
            <p className="text-[11px] font-bold text-emerald-700">Record is unchanged</p>
          </div>
        </div>

        {/* Sample Verification Comparison Box */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-3 font-mono text-xs">
          <div className="flex justify-between border-b border-slate-200 pb-2 font-sans font-bold text-slate-900">
            <span>Shipment Sensor Record</span>
            <span className="text-emerald-600">✓ Match Verified</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-sans">Recorded Data</span>
              <p className="text-slate-800 font-bold">Temperature: {record.sampleTemperature}</p>
              <p className="text-slate-500 text-[11px]">Timestamp: {record.sampleTimestamp}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-sans">Stored Fingerprint</span>
              <p className="text-slate-800 font-bold text-[11px]">{record.storedVerification}</p>
              <p className="text-emerald-600 text-[11px] font-sans font-bold mt-1">
                ✓ MATCH — Record is unchanged
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
        <h2 className="text-base font-black text-slate-900 tracking-tight">
          Why does this matter?
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Shipment data can pass through many systems and people. FreshTrace AI creates a secure fingerprint of important records and stores that fingerprint in a shared verification system. If someone changes the original record later, the fingerprints will no longer match.
        </p>
      </div>

      {/* Verification Explanation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="max-w-md w-full rounded-2xl bg-white p-6 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                How Verification Works
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-medium">
              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <p>Sensor data is continuously recorded during shipment transit.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <p>A secure digital fingerprint is created for every data reading.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[10px] shrink-0 mt-0.5">
                  3
                </span>
                <p>The fingerprint is stored for future verification checks.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[10px] shrink-0 mt-0.5">
                  4
                </span>
                <p>Wholesalers and fleet owners check the record at any time to guarantee authenticity.</p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer text-center"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
