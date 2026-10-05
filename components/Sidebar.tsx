'use client';

import React from 'react';
import { UserRole, FleetNavTab, WholesalerNavTab } from '@/types/telemetry';
import {
  LayoutDashboard,
  MapPin,
  Truck,
  Boxes,
  Sparkles,
  AlertTriangle,
  FileSearch,
  CheckCircle2,
  Wifi,
  FileText,
  ShieldCheck,
  PackageCheck,
  X,
} from 'lucide-react';

interface SidebarProps {
  currentRole: UserRole;
  activeFleetTab: FleetNavTab;
  activeWholesalerTab: WholesalerNavTab;
  onFleetTabChange: (tab: FleetNavTab) => void;
  onWholesalerTabChange: (tab: WholesalerNavTab) => void;
  shipmentCount?: number;
  alertCount?: number;
  isMobileOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeFleetTab,
  activeWholesalerTab,
  onFleetTabChange,
  onWholesalerTabChange,
  shipmentCount = 24,
  alertCount = 3,
  isMobileOpen = false,
  onCloseMobileMenu,
}) => {
  const isFleetOwner = currentRole === 'fleet_owner';

  const fleetNavItems = [
    { id: 'overview' as FleetNavTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'live-map' as FleetNavTab, label: 'Live Map', icon: MapPin },
    { id: 'fleet' as FleetNavTab, label: 'My Fleet', icon: Boxes },
    { id: 'shipments' as FleetNavTab, label: 'Shipments', icon: Truck, badge: shipmentCount.toString() },
    { id: 'ai-insights' as FleetNavTab, label: 'AI Insights', icon: Sparkles, badge: '' },
    { id: 'alerts' as FleetNavTab, label: 'Alerts', icon: AlertTriangle, badge: alertCount.toString(), isAlert: true },
    { id: 'traceability' as FleetNavTab, label: 'Traceability', icon: FileSearch },
    { id: 'record-verification' as FleetNavTab, label: 'Record Verification', icon: CheckCircle2 },
    { id: 'connection-status' as FleetNavTab, label: 'Connection Status', icon: Wifi },
    { id: 'reports' as FleetNavTab, label: 'Reports', icon: FileText },
  ];

  const wholesalerNavItems = [
    { id: 'overview' as WholesalerNavTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'incoming-shipments' as WholesalerNavTab, label: 'Incoming Shipments', icon: Truck, badge: '8' },
    { id: 'shipment-check' as WholesalerNavTab, label: 'Shipment Check', icon: PackageCheck, badge: 'Check' },
    { id: 'ai-insights' as WholesalerNavTab, label: 'AI Insights', icon: Sparkles, badge: '' },
    { id: 'traceability' as WholesalerNavTab, label: 'Traceability', icon: FileSearch },
    { id: 'record-verification' as WholesalerNavTab, label: 'Record Verification', icon: CheckCircle2 },
    { id: 'alerts' as WholesalerNavTab, label: 'Alerts', icon: AlertTriangle, badge: '2', isAlert: true },
    { id: 'reports' as WholesalerNavTab, label: 'Reports', icon: FileText },
  ];

  const currentItems = isFleetOwner ? fleetNavItems : wholesalerNavItems;
  const currentActive = isFleetOwner ? activeFleetTab : activeWholesalerTab;

  const handleNavClick = (itemId: string) => {
    if (isFleetOwner) onFleetTabChange(itemId as FleetNavTab);
    else onWholesalerTabChange(itemId as WholesalerNavTab);
    if (onCloseMobileMenu) onCloseMobileMenu();
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full select-none">
      {/* Top Section */}
      <div className="p-3 space-y-4 overflow-y-auto">
        {/* User Role Card */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Active Workspace
            </span>
            {onCloseMobileMenu && (
              <button
                onClick={onCloseMobileMenu}
                className="md:hidden p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-xs font-black text-slate-900 truncate">
            {isFleetOwner ? 'Fleet Owner Portal' : 'Wholesaler Portal'}
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            {isFleetOwner ? 'Managing 32 Trucks' : 'Raipur Regional Hub'}
          </p>
        </div>

        {/* Nav List */}
        <nav className="space-y-1 pt-1">
          {currentItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentActive === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-500'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      item.isAlert
                        ? 'bg-red-500 text-white'
                        : isActive
                        ? 'bg-slate-800 text-sky-400'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Card */}
      <div className="p-3 border-t border-slate-100 space-y-3 bg-slate-50/50">
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 text-[11px] font-medium text-emerald-800">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="truncate">Sensors & Integrity Active</span>
        </div>

        <div className="flex items-center justify-between rounded-lg p-2 bg-white border border-slate-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white shrink-0 font-bold text-xs">
              AG
            </div>
            <div className="min-w-0 text-left">
              <p className="text-xs font-extrabold text-slate-900 truncate">
                {isFleetOwner ? 'Aryan Goswami' : 'Rajesh Verma'}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {isFleetOwner ? 'Fleet Manager' : 'Receiving Lead'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-slate-200 bg-white shrink-0 h-[calc(100vh-4rem)] sticky top-16 flex-col">
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop & Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={onCloseMobileMenu}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Sidebar Content */}
          <aside className="relative z-10 w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
};
