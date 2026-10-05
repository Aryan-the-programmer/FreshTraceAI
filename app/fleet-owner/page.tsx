'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { FleetOwnerOverview } from '@/components/FleetOwnerOverview';
import { LiveMapTab } from '@/components/LiveMapTab';
import { FleetPage } from '@/components/FleetPage';
import { ShipmentsPage } from '@/components/ShipmentsPage';
import { ShipmentDetailView } from '@/components/ShipmentDetailView';
import { AIInsightsPage } from '@/components/AIInsightsPage';
import { AlertsPage } from '@/components/AlertsPage';
import { TraceabilityPage } from '@/components/TraceabilityPage';
import { RecordVerificationPage } from '@/components/RecordVerificationPage';
import { ConnectionStatusPage } from '@/components/ConnectionStatusPage';
import { ReportsPage } from '@/components/ReportsPage';
import { useRouter } from 'next/navigation';

import {
  mockFleetStats,
  mockTrucks,
  mockShipments,
  mockTelemetryStream,
  mockRelayNodes,
  mockMapTrucks,
  mockRiskFactors,
  mockJourneyStages,
  mockAlerts,
  mockVerificationRecord,
  mockConnectionNodes,
} from '@/lib/mockData';

import { UserRole, FleetNavTab } from '@/types/telemetry';

export default function FleetOwnerRoute() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<FleetNavTab>('overview');
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>('SH-1024');
  const [selectedTruckId, setSelectedTruckId] = useState<string>('TRK-104');

  const currentShipment =
    mockShipments.find((s) => s.id === selectedShipmentId) || mockShipments[0];

  const handleRoleSwitch = (role: UserRole) => {
    if (role === 'landing') router.push('/');
    else if (role === 'login') router.push('/login');
    else if (role === 'wholesaler') router.push('/wholesaler');
  };

  const handleSelectShipment = (id: string) => {
    setSelectedShipmentId(id);
    setActiveTab('shipment-detail');
  };

  const handleSelectTruck = (truckId: string) => {
    setSelectedTruckId(truckId);
    setActiveTab('fleet');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      <Header currentRole="fleet_owner" onRoleSwitch={handleRoleSwitch} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentRole="fleet_owner"
          activeFleetTab={activeTab}
          activeWholesalerTab="overview"
          onFleetTabChange={setActiveTab}
          onWholesalerTabChange={() => {}}
          shipmentCount={mockShipments.length}
          alertCount={mockAlerts.length}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'overview' && (
            <FleetOwnerOverview
              stats={mockFleetStats}
              trucks={mockTrucks}
              shipments={mockShipments}
              onSelectTruck={handleSelectTruck}
              onSelectShipment={handleSelectShipment}
              onNavigateToMap={() => setActiveTab('live-map')}
            />
          )}

          {activeTab === 'live-map' && (
            <LiveMapTab
              trucks={mockMapTrucks}
              relayNodes={mockRelayNodes}
              shipments={mockShipments as any}
              onSelectShipment={handleSelectShipment}
            />
          )}

          {activeTab === 'fleet' && (
            <FleetPage
              trucks={mockTrucks}
              onSelectTruck={handleSelectTruck}
              onSelectShipment={handleSelectShipment}
            />
          )}

          {activeTab === 'shipments' && (
            <ShipmentsPage
              shipments={mockShipments}
              onSelectShipment={handleSelectShipment}
            />
          )}

          {activeTab === 'shipment-detail' && (
            <ShipmentDetailView
              shipment={currentShipment}
              telemetry={mockTelemetryStream}
              onBack={() => setActiveTab('shipments')}
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

          {activeTab === 'alerts' && (
            <AlertsPage
              alerts={mockAlerts}
              onSelectShipment={handleSelectShipment}
              onSelectTruck={handleSelectTruck}
            />
          )}

          {activeTab === 'traceability' && (
            <TraceabilityPage stages={mockJourneyStages} />
          )}

          {activeTab === 'record-verification' && (
            <RecordVerificationPage record={mockVerificationRecord} />
          )}

          {activeTab === 'connection-status' && (
            <ConnectionStatusPage nodes={mockConnectionNodes} />
          )}

          {activeTab === 'reports' && <ReportsPage />}
        </main>
      </div>
    </div>
  );
}
