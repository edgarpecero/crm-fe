'use server';

import { Order, OrderRequest } from '@/types/orders';
import { orderService } from '../orderService';
import { createAction, updateAction, deleteAction, ActionResponse } from './createApiActions';
import { z } from 'zod';

// Interface específica para la respuesta de creación de orden
export const createOrderAction = async (data: OrderRequest): Promise<ActionResponse<Order>> => {
  try {
    const res = await createAction(orderService, processData(data));
    return {
      success: true,
      message: 'Orden creada con éxito',
      data: res as Order,
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

export const updateOrderAction = async (
  id: string,
  data: OrderRequest,
): Promise<ActionResponse<Order>> => {
  try {
    const resp = await updateAction(orderService, id, processData(data) as Order);
    return {
      success: true,
      message: 'Orden actualizada con éxito',
      data: resp as Order,
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

export const deleteOrderAction = async (id: string): Promise<void> => {
  deleteAction(orderService, id);
};

const processData = (data: OrderRequest): OrderRequest => {
  const validatedData = data;

  if (validatedData?.customer?.birthdate) {
    const date = new Date(validatedData.customer.birthdate);
    validatedData.customer.birthdate = date.toISOString();
  }
  if (validatedData?.customer?.licenseExpiration) {
    const date = new Date(validatedData.customer.licenseExpiration);
    validatedData.customer.licenseExpiration = date.toISOString();
  }
  return validatedData;
};
