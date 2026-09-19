export interface AwsService {
  id: string;
  name: string;
  category: 'Compute' | 'Storage' | 'Database' | 'Networking' | 'Security';
  description: string;
  mainFunction: string;
  status: 'active' | 'inactive';
}

export interface CloudProposal {
  id: string;
  solutionName: string;
  appType: string;
  description: string;
  region: string;
  estimatedUsers: number;
  availabilityLevel: 'Básica' | 'Alta' | 'Crítica';
  selectedServices: string[];
  migrationGoal: string;
}

export interface CostEstimate {
  id: string;
  serviceName: string;
  quantity: number;
  estimatedHours: number;
  estimatedCost: number;
  monthlyCost: number;
  annualCost: number;
}

export interface Region {
  id: string;
  code: string;
  location: string;
  deployedServices: string[];
  status: 'active' | 'degraded' | 'inactive';
}

export type SecurityStatus = 'ok' | 'warning' | 'error';

export interface SecurityItem {
  id: string;
  name: string;
  category: 'Responsabilidad compartida' | 'IAM' | 'Protección de cuentas' | 'Protección de datos' | 'Cumplimiento';
  status: SecurityStatus;
  description: string;
}