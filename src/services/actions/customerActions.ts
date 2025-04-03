'use server';

import { Customer, CustomerRequest } from '@/types/customers';
import { customerService } from '../customerService';
import { createAction, updateAction, deleteAction, ActionResponse } from './createApiActions';
import { z } from 'zod';

export const createCustomerAction = async (
  data: CustomerRequest,
): Promise<ActionResponse<Customer>> => {
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
): Promise<ActionResponse<Customer>> => {
  try {
    const resp = await updateAction(customerService, id, processData(data));
    return {
      success: true,
      message: 'Cliente actualizado con éxito',
      data: resp as Customer,
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

export const deleteCustomerAction = async (id: string): Promise<ActionResponse<void>> => {
  try {
    await deleteAction(customerService, id);
    return {
      success: true,
      message: 'Cliente eliminado con éxito',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al eliminar el cliente ' + error,
    };
  }
};

const processData = (data: CustomerRequest): CustomerRequest => {
  //TODO: Add logic to format data before sending
  return data;
};
