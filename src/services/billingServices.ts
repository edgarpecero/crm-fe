import { Billing } from '@/components/features/billing/types';

export const fetchBillingData = async () => {
  try {
    const response = await fetch('/data/billing.json');
    if (!response.ok) {
      throw new Error('Failed to fetch billing data');
    }
    const data: Billing[] = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
};
