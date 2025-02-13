import { Customer } from '@/components/features/customer/types';

export const fetchCustomerById = async (id: number) => {
  try {
    const response = await fetch(`/data/customer${id}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Customer ${id} data`);
    }
    const data: Customer[] = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
};

export const fetchCustomersData = async () => {
  try {
    const response = await fetch(`/data/customersdata.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch Customer data');
    }
    const data: Customer[] = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
};
