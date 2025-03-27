'use client';

import { fetchCustomersData } from '@/services/customerServices';
import { Customer } from '@/types/customers';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

interface CustomerContextType {
  data: Customer[];
  loading: boolean;
  customer: Customer | null;
  setCustomer: Dispatch<SetStateAction<Customer | null>>;
  error: Error | null;
  refreshData: () => void;
}

interface Props {
  children: React.ReactNode;
}

const CustomerContext = createContext({} as CustomerContextType);

export const CustomerProvider = ({ children }: Props) => {
  const value = useCustomerProvider();
  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

const useCustomerProvider = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshData = async () => {
    setLoading(true);
    const { data, error } = await fetchCustomersData();
    if (error) {
      setError(error);
    } else {
      console.log(data);
      setData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return { data, loading, error, customer, setCustomer, refreshData };
};
