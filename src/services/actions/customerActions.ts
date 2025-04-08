'use server';

import { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '@/types/customers';
import { customerService } from '../customerService';
import { createAction, updateAction, deleteAction, ActionResponse } from './createApiActions';
import { z } from 'zod';

export const createCustomerAction = async (
  data: CreateCustomerRequest,
): Promise<ActionResponse<Customer>> => {
  try {
    data.birthdate.toISOString();
    data.workplace.startDate.toISOString();
    data.beneficiary.birthdate.toISOString();
    const res = await createAction(customerService, data);
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
  data: UpdateCustomerRequest,
  id: string,
): Promise<ActionResponse<Customer>> => {
  try {
    const resp = await updateAction(customerService, id, data);
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
