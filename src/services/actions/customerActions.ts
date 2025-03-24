'use server';

import { Customer } from '@/types/customers';
import { customerService } from '../customerService';
import { createAction, updateAction, deleteAction } from './createApiActions';

export const createCustomerAction = async (data: Customer): Promise<Customer> => {
  return createAction(customerService, data);
};

export const updateCustomerAction = async (id: string, data: Partial<Customer>): Promise<Customer> => {
  return updateAction(customerService, id, data);
};

export const deleteCustomerAction = async (id: string): Promise<void> => {
  deleteAction(customerService, id);
};
