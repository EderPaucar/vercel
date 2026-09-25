import type {
  AwsService,
  Region,
  SecurityItem,
  CostEstimate,
} from '../types/cloud'

export const awsServices: AwsService[] = [
  {
    id: 'ec2',
    name: 'EC2',
    category: 'Compute',
    description:
      'Servicio de cómputo que proporciona servidores virtuales bajo demanda.',
    mainFunction:
      'Ejecutar aplicaciones y cargas de trabajo en servidores virtuales.',
    status: 'active',
  },
  {
    id: 's3',
    name: 'S3',
    category: 'Storage',
    description:
      'Servicio de almacenamiento de objetos con alta durabilidad y escalabilidad.',
    mainFunction:
      'Almacenar y recuperar archivos, documentos y otros objetos.',
    status: 'active',
  },
  {
    id: 'rds',
    name: 'RDS',
    category: 'Database',
    description:
      'Servicio administrado para implementar y operar bases de datos relacionales.',
    mainFunction:
      'Facilitar la administración de bases de datos relacionales.',
    status: 'active',
  },
  {
    id: 'iam',
    name: 'IAM',
    category: 'Security',
    description:
      'Servicio para administrar identidades y permisos de acceso a recursos de AWS.',
    mainFunction:
      'Controlar usuarios, roles y permisos de acceso a los recursos.',
    status: 'active',
  },
  {
    id: 'vpc',
    name: 'VPC',
    category: 'Networking',
    description:
      'Servicio que permite crear una red virtual aislada para recursos de AWS.',
    mainFunction:
      'Organizar y controlar la comunicación entre los recursos de la solución.',
    status: 'active',
  },
  {
    id: 'route53',
    name: 'Route 53',
    category: 'Networking',
    description:
      'Servicio DNS administrado para dirigir solicitudes hacia aplicaciones y recursos.',
    mainFunction:
      'Resolver nombres de dominio y dirigir el tráfico hacia los recursos correspondientes.',
    status: 'active',
  },
  {
    id: 'cloudfront',
    name: 'CloudFront',
    category: 'Networking',
    description:
      'Servicio de entrega de contenido que distribuye contenido mediante una red global.',
    mainFunction:
      'Mejorar la entrega de contenido a los usuarios mediante una CDN.',
    status: 'active',
  },
]

export const regions: Region[] = [
  {
    id: 'us-east-1',
    code: 'us-east-1',
    location: 'Virginia del Norte, EE. UU.',
    plannedServices: ['EC2', 'S3', 'RDS'],
  },
  {
    id: 'eu-west-1',
    code: 'eu-west-1',
    location: 'Irlanda, Europa',
    plannedServices: ['EC2', 'CloudFront'],
  },
  {
    id: 'sa-east-1',
    code: 'sa-east-1',
    location: 'São Paulo, Brasil',
    plannedServices: ['S3', 'Route 53'],
  },
  {
    id: 'ap-southeast-1',
    code: 'ap-southeast-1',
    location: 'Singapur, Asia',
    plannedServices: ['EC2'],
  },
]

export const securityItems: SecurityItem[] = [
  {
    id: 'sr1',
    name: 'Modelo de responsabilidad compartida',
    category: 'Responsabilidad compartida',
    status: 'ok',
    description:
      'La propuesta considera la responsabilidad de AWS sobre la infraestructura y la del cliente sobre sus datos y configuraciones.',
  },
  {
    id: 'sr2',
    name: 'Políticas IAM',
    category: 'IAM',
    status: 'ok',
    description:
      'La propuesta considera el uso de usuarios, roles y permisos de acuerdo con las necesidades de acceso.',
  },
  {
    id: 'sr3',
    name: 'Autenticación multifactor',
    category: 'Protección de cuentas',
    status: 'warning',
    description:
      'Se considera MFA como medida de protección para las cuentas y accesos administrativos.',
  },
  {
    id: 'sr4',
    name: 'Cifrado de datos',
    category: 'Protección de datos',
    status: 'ok',
    description:
      'La propuesta considera mecanismos de protección de datos en tránsito y en reposo.',
  },
  {
    id: 'sr5',
    name: 'Cumplimiento normativo',
    category: 'Cumplimiento',
    status: 'warning',
    description:
      'La propuesta requiere revisar los requisitos de cumplimiento aplicables antes de una implementación real.',
  },
]

export const costEstimates: CostEstimate[] = [
  {
    id: 'c1',
    serviceName: 'EC2',
    quantity: 2,
    estimatedHours: 720,
    estimatedCost: 0.05,
    monthlyCost: 72,
    annualCost: 864,
  },
  {
    id: 'c2',
    serviceName: 'S3',
    quantity: 1,
    estimatedHours: 720,
    estimatedCost: 0.023,
    monthlyCost: 16.5,
    annualCost: 198,
  },
  {
    id: 'c3',
    serviceName: 'RDS',
    quantity: 1,
    estimatedHours: 720,
    estimatedCost: 0.09,
    monthlyCost: 64.8,
    annualCost: 777.6,
  },
  {
    id: 'c4',
    serviceName: 'CloudFront',
    quantity: 1,
    estimatedHours: 720,
    estimatedCost: 0.02,
    monthlyCost: 14.4,
    annualCost: 172.8,
  },
  {
    id: 'c5',
    serviceName: 'Route 53',
    quantity: 1,
    estimatedHours: 720,
    estimatedCost: 0.01,
    monthlyCost: 7.2,
    annualCost: 86.4,
  },
]