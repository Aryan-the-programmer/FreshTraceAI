'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { WholesalerDashboard } from '@/components/WholesalerDashboard';
import { ShipmentsPage } from '@/components/ShipmentsPage';
import { ShipmentDetailView } from '@/components/ShipmentDetailView';
import { AIInsightsPage } from '@/components/AIInsightsPage';
import { AlertsPage } from '@/components/AlertsPage';
import { TraceabilityPage } from '@/components/TraceabilityPage';
import { RecordVerificationPage } from '@/components/RecordVerificationPage';
import { ReportsPage } from '@/components/ReportsPage';
import { useRouter } from 'next/navigation';

import {
  mockWholesalerStats,
  mockShipments,
  mockTelemetryStream,
  mockRiskFactors,
  mockJourneyStages,
  mockAlerts,
  mockVerificationRecord,
} from '@/lib/mockData';

import { UserRole, WholesalerNavTab } from '@/types/telemetry';

export default function WholesalerRoute() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<WholesalerNavTab>('overview');
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>('SH-1024');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentShipment =
    mockShipments.find((s) => s.id === selectedShipmentId) || mockShipments[0];

  const handleRoleSwitch = (role: UserRole) => {
    if (role === 'landing') router.push('/');
    else if (role === 'login') router.push('/login');
    else if (role === 'fleet_owner') router.push('/fleet-owner');
  };

  const handleSelectShipment = (id: string) => {
    setSelectedShipmentId(id);
    setActiveTab('shipment-detail');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      <Header
        currentRole="wholesaler"
        onRoleSwitch={handleRoleSwitch}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentRole="wholesaler"
          activeFleetTab="overview"
          activeWholesalerTab={activeTab}
          onFleetTabChange={() => {}}
          onWholesalerTabChange={setActiveTab}
          shipmentCount={mockShipments.length}
          alertCount={mockAlerts.length}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'overview' && (
            <WholesalerDashboard
              stats={mockWholesalerStats}
              incomingShipments={mockShipments}
              onSelectShipment={handleSelectShipment}
              onNavigateToCheck={() => setActiveTab('shipment-check')}
            />
          )}

          {activeTab === 'incoming-shipments' && (
            <ShipmentsPage
              shipments={mockShipments}
              onSelectShipment={handleSelectShipment}
            />
          )}

          {activeTab === 'shipment-check' && (
            <WholesalerDashboard
              stats={mockWholesalerStats}
              incomingShipments={mockShipments}
              onSelectShipment={handleSelectShipment}
              onNavigateToCheck={() => {}}
            />
          )}

          {activeTab === 'shipment-detail' && (
            <ShipmentDetailView
              shipment={currentShipment}
              telemetry={mockTelemetryStream}
              onBack={() => setActiveTab('incoming-shipments')}
              onNavigateToAI={() => setActiveTab('ai-insights')}
              onNavigateToVerification={() => setActiveTab('record-verification')}
            />
          )}

          {activeTab === 'ai-insights' && (
            <AIInsightsPage
              remainingShelfLife={currentShipment.remainingShelfLife}
              spoilageRisk={currentShipment.spoilageRisk}
              confidence="91%"
              factors={mockRiskFactors}
              onNavigateToShipment={() => setActiveTab('shipment-detail')}
            />
          )}

          {activeTab === 'traceability' && (
            <TraceabilityPage stages={mockJourneyStages} />
          )}

          {activeTab === 'record-verification' && (
            <RecordVerificationPage record={mockVerificationRecord} />
          )}

          {activeTab === 'alerts' && (
            <AlertsPage
              alerts={mockAlerts}
              onSelectShipment={handleSelectShipment}
              onSelectTruck={() => {}}
            />
          )}

          {activeTab === 'reports' && <ReportsPage />}
        </main>
      </div>
    </div>
  );
}
