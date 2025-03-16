'use client';

import { Billing } from '@/components/features/billing/types';
import { fetchBillingData } from '@/services/billingServices';
import { createContext, useContext, useEffect, useState } from 'react';

interface BillingContextType {
  data: Billing[];
  loading: boolean;
  error: Error | null;
  refreshData: () => void;
  refresh: boolean;
  handleRefresh: () => void;
  count: number;
}

interface Props {
  children: React.ReactNode;
}

const BillingContext = createContext({} as BillingContextType);

export const BillingProvider = ({ children }: Props) => {
  const value = useBillingProvider();
  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
};

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
};

const useBillingProvider = () => {
  const [data, setData] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [count, setCount] = useState(0);

  const refreshData = async () => {
    setLoading(true);
    const { data, error } = await fetchBillingData();
    if (error) {
      setError(error);
    } else {
      setData(data);
    }
    setLoading(false);
  };

  const handleRefresh = () => {
    setCount((prev) => prev + 1);
    setRefresh(!refresh);
  };

  useEffect(() => {
    refreshData();
  }, [refresh]);

  return { data, loading, error, refreshData, refresh, handleRefresh, count };
};
