import { Billing } from '@/components/features/billing/types';

export const useBillingData = async () => {
  try {
    const response = await fetch('/data/billing.json');
    if (!response.ok) {
      throw new Error('Failed to fetch billing data');
    }
    const data: Billing[] = await response.json();
    return { data, loading: false, error: null };
  } catch (error) {
    return { data: [], loading: false, error: error as Error };
  }
};
