import type { AmountRange, Sector } from '../types/database';

export const SECTORS: Sector[] = [
  'AI',
  'SaaS',
  'Fintech',
  'E-commerce',
  'Healthtech',
  'Energy',
  'Other',
];

export const AMOUNT_RANGES: { value: AmountRange; label: string }[] = [
  { value: '0-50k', label: '$0–50K' },
  { value: '50-100k', label: '$50K–100K' },
  { value: '100-250k', label: '$100K–250K' },
  { value: '250-500k', label: '$250K–500K' },
  { value: '500k-1m', label: '$500K–1M' },
  { value: '1m+', label: '$1M+' },
];
