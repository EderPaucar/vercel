import { AwsService, Region, SecurityItem, CostEstimate } from '../types/cloud';

export const awsServices: AwsService[] = [
  {
    id: 'ec2',
    name: 'EC2',
    category: 'Compute',
    description: 'Servidores virtuales en la nube con capacidad de cómputo flexible.',
    mainFunction: 'Ejecutar aplicaciones y cargas de trabajo escalables.',
    status: 'active',
  },
  {
    id: 's3',
    name: 'S3',
    category: 'Storage',
    description: 'Servicio de almacenamiento de objetos escalable.',
    mainFunction: 'Guardar y recuperar archivos y datos de forma duradera.',
    status: 'active',
  },
  {
    id: 'rds',
    name: 'RDS',
    category: 'Database',
    description: 'Servicio de base de datos relacional administrada.',
    mainFunction: 'Gestionar bases de datos compatibles con múltiples motores.',
    status: 'active',
  },
  {
    id: 'iam',
    name: 'IAM',
    category: 'Security',
    description: 'Gestión de identidades y accesos para recursos de AWS.',
    mainFunction: 'Controlar quién puede acceder a qué recursos.',
    status: 'active',
  },
  {
    id: 'vpc',
    name: 'VPC',
    category: 'Networking',
    description: 'Nube privada virtual para aislar y proteger la red.',
    mainFunction: 'Organizar y aislar recursos dentro de una red privada.',
    status: 'active',
  },
  {
    id: 'route53',
    name: 'Route 53',
    category: 'Networking',
    description: 'Servicio de DNS y registro de dominios.',
    mainFunction: 'Enrutar el tráfico de usuarios hacia la aplicación.',
    status: 'active',
  },
  {
    id: 'cloudfront',
    name: 'CloudFront',
    category: 'Networking',
    description: 'Red de distribución de contenido (CDN).',
    mainFunction: 'Acelerar la entrega de contenido a usuarios globales.',
    status: 'active',
  },
];

export const regions: Region[] = [
  {
    id: 'us-east-1',
    code: 'us-east-1',
    location: 'Virginia del Norte, EE. UU.',
    deployedServices: ['EC2', 'S3', 'RDS'],
    status: 'active',
  },
  {
    id: 'eu-west-1',
    code: 'eu-west-1',
    location: 'Irlanda, Europa',
    deployedServices: ['EC2', 'CloudFront'],
    status: 'active',
  },
  {
    id: 'sa-east-1',
    code: 'sa-east-1',
    location: 'São Paulo, Brasil',
    deployedServices: ['S3', 'Route 53'],
    status: 'degraded',
  },
  {
    id: 'ap-southeast-1',
    code: 'ap-southeast-1',
    location: 'Singapur, Asia',
    deployedServices: ['EC2'],
    status: 'inactive',
  },
];

export const securityItems: SecurityItem[] = [
  {
    id: 'sr1',
    name: 'Modelo de responsabilidad compartida',
    category: 'Responsabilidad compartida',
    status: 'ok',
    description: 'AWS protege la infraestructura; el cliente protege sus datos y configuraciones.',
  },
  {
    id: 'sr2',
    name: 'Políticas IAM',
    category: 'IAM',
    status: 'ok',
    description: 'Usuarios y roles configurados con permisos mínimos necesarios.',
  },
  {
    id: 'sr3',
    name: 'Autenticación multifactor',
    category: 'Protección de cuentas',
    status: 'warning',
    description: 'No todos los usuarios tienen MFA habilitado.',
  },
  {
    id: 'sr4',
    name: 'Cifrado de datos',
    category: 'Protección de datos',
    status: 'ok',
    description: 'Datos cifrados en tránsito y en reposo.',
  },
  {
    id: 'sr5',
    name: 'Cumplimiento normativo',
    category: 'Cumplimiento',
    status: 'warning',
    description: 'Revisión pendiente de estándares de cumplimiento.',
  },
];

export const costEstimates: CostEstimate[] = [
  { id: 'c1', serviceName: 'EC2', quantity: 2, estimatedHours: 720, estimatedCost: 0.05, monthlyCost: 72, annualCost: 864 },
  { id: 'c2', serviceName: 'S3', quantity: 1, estimatedHours: 720, estimatedCost: 0.023, monthlyCost: 16.5, annualCost: 198 },
  { id: 'c3', serviceName: 'RDS', quantity: 1, estimatedHours: 720, estimatedCost: 0.09, monthlyCost: 64.8, annualCost: 777.6 },
  { id: 'c4', serviceName: 'CloudFront', quantity: 1, estimatedHours: 720, estimatedCost: 0.02, monthlyCost: 14.4, annualCost: 172.8 },
  { id: 'c5', serviceName: 'Route 53', quantity: 1, estimatedHours: 720, estimatedCost: 0.01, monthlyCost: 7.2, annualCost: 86.4 },
];