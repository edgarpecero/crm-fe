'use server';

import { Customer, CustomerRequest } from '@/types/customers';
import { customerService } from '../customerService';
import { createAction, updateAction, deleteAction } from './createApiActions';
import { z } from 'zod';
import { customerSchema } from '@/components/features/orders/helpers';

export const createCustomerAction = async (data: CustomerRequest) => {
  try {
    const res = await createAction(customerService, processData(data));
    return {
      success: true,
      message: 'Cliente creado con éxito',
      data: res as Customer,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      };
    }
    return {
      success: false,
      message: 'Error en el servidor',
    };
  }
};

export const updateCustomerAction = async (
  id: string,
  data: CustomerRequest,
): Promise<Customer> => {
  const resp = await updateAction(customerService, id, processData(data) as Customer);
  console.log('resp', resp);
  return resp as Customer;
};

export const deleteCustomerAction = async (id: string): Promise<void> => {
  deleteAction(customerService, id);
};

const processData = (data: CustomerRequest): CustomerRequest => {
  const validatedData = customerSchema.parse(data);

  if (validatedData?.birthdate) {
    const date = new Date(validatedData.birthdate);
    validatedData.birthdate = date.toISOString();
  }
  if (validatedData?.licenseExpiration) {
    const date = new Date(validatedData.licenseExpiration);
    validatedData.licenseExpiration = date.toISOString();
  }

  return validatedData as CustomerRequest;
};
