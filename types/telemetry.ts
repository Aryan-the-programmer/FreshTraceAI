export type UserRole = 'landing' | 'login' | 'fleet_owner' | 'wholesaler' | 'admin';

export type FleetNavTab =
  | 'overview'
  | 'live-map'
  | 'fleet'
  | 'shipments'
  | 'shipment-detail'
  | 'ai-insights'
  | 'alerts'
  | 'traceability'
  | 'record-verification'
  | 'connection-status'
  | 'reports';

export type WholesalerNavTab =
  | 'overview'
  | 'incoming-shipments'
  | 'shipment-check'
  | 'shipment-detail'
  | 'ai-insights'
  | 'traceability'
  | 'record-verification'
  | 'alerts'
  | 'reports';

export interface TruckItem {
  id: string; // e.g. "TRK-104"
  driver: string; // e.g. "Rajesh Verma"
  route: string; // e.g. "Nashik → Nagpur → Raipur"
  shipmentId: string; // e.g. "SH-1024"
  cargoName: string;
  temperature: string;
  battery: number; // e.g. 84 (%)
  connectionStatus: 'Internet connected' | 'Internet unavailable (Offline storing)' | 'Long-range relay active';
  spoilageRisk: number; // e.g. 23
  status: 'Online' | 'Needs Attention' | 'Offline';
  lastSeen: string;
  remainingShelfLife: string;
  xPercent: number; // For map visualization
  yPercent: number;
}

export interface ShipmentItem {
  id: string; // e.g. "SH-1024"
  product: string; // e.g. "Fresh Apples"
  cargoType?: string;
  volume: string; // e.g. "2,400 kg (12 Pallets)"
  truckId: string; // e.g. "TRK-104"
  assignedTruck?: string;
  origin: string; // e.g. "Nashik Farm Hub"
  destination: string; // e.g. "Raipur Regional Warehouse"
  eta: string; // e.g. "4:30 PM (In 14 mins)"
  temperature: string;
  chamberTemp?: string;
  temperatureStatus: 'Normal' | 'Warning' | 'Excursion';
  humidity: string; // e.g. "72%"
  ethylene: string; // e.g. "0.31 ppm"
  remainingShelfLife: string; // e.g. "6.4 days"
  spoilageRisk: number; // e.g. 23
  riskLevel: 'Low' | 'Moderate' | 'High';
  status: 'In Transit' | 'Arriving Soon' | 'Delayed' | 'Delivered' | string;
  networkSync?: string;
  tempTrend?: string;
  battery: number;
  connectionStatus: 'Online' | 'Offline storing' | 'Long-range relay';
  verifiedRecord: boolean; // Simple language for record verification
  decisionRecommendation?: 'SAFE TO RECEIVE' | 'REVIEW BEFORE RECEIVING';
  weight?: string;
  route?: string;
  blockNumber?: string;
  lotNumber?: string;
  grade?: string;
  driver?: string;
  carrier?: string;
  speed?: string;
  reeferUnit?: string;
  tamperSeal?: string;
  lastSync?: string;
  temperatureMetric?: any;
  humidityMetric?: any;
  ethyleneMetric?: any;
  aiShelfLifeMetric?: any;
  sensorProbeMetric?: any;
  aiSynthesis?: any;
}

export interface TelemetryPoint {
  time: string;
  cargoTemp: number;
  safeUpper: number;
  safeLower: number;
  isExcursion?: boolean;
  excursionInfo?: string;
  humidity: number;
  ethylenePpm: number;
}

export interface RelayNode {
  id: string;
  tag: string;
  truckId: string;
  role: string;
  description: string;
  statusBadge: string;
  statusType: 'error' | 'primary' | 'success';
  icon: 'cell' | 'wifi' | 'cloud';
}

export interface DashboardOverviewStats {
  activeShipments: { count: number; trend: string; corridorsCount: number };
  trucksInTransit: { count: number; onlineCount: number; offlineCount: number };
  avgShelfLife: { days: string; aiOptimized: string; label: string };
  highRiskShipments: { count: number; actionRequired: boolean; reason: string };
  dataIntegrity: { percentage: string; batches: string; verified: boolean };
}

export interface MapTruckNode {
  id: string;
  truckId: string;
  name: string;
  locationName: string;
  temp: string;
  status: 'Normal' | 'Warning' | 'Critical' | 'Offline';
  xPercent: number;
  yPercent: number;
  lastSeen?: string;
  shelfLife?: string;
  spoilageRisk?: string;
  loraRelayInfo?: string;
  shipmentId?: string;
  cargoName?: string;
}

// Aliases for legacy component compatibility
export type Shipment = ShipmentItem;
export type WholesalerStats = any;
export type VerificationProtocolItem = any;
export type IncomingManifestRow = any;
export type AllocationChannel = any;
export type IntakeBayData = any;

export interface RiskFactor {
  factor: string;
  impact: string; // e.g. "+12%"
  description: string;
  type: 'negative' | 'neutral' | 'positive';
}

export interface JourneyStage {
  step: number;
  title: string;
  location: string;
  time: string;
  condition: string;
  verificationStatus: 'Verified' | 'Pending';
  icon: 'farm' | 'storage' | 'truck' | 'warehouse';
}

export interface AlertItem {
  id: string;
  time: string;
  truckId?: string;
  shipmentId?: string;
  problem: string;
  severity: 'Critical' | 'Warning' | 'Info';
  category: 'Needs attention' | 'Warnings' | 'Resolved';
  resolved?: boolean;
}

export interface VerificationRecord {
  shipmentId: string;
  batchesRecorded: number;
  batchesVerified: number;
  issuesFound: number;
  integrityPercentage: number;
  sampleTemperature: string;
  sampleTimestamp: string;
  fingerprint: string;
  storedVerification: string;
  isMatch: boolean;
}

export interface ConnectionNode {
  truckId: string;
  internetStatus: 'Connected' | 'Unavailable';
  longRangeStatus: 'Connected' | 'Relay Active' | 'Offline';
  storedRecordsCount: number;
  relayPath?: string;
}
