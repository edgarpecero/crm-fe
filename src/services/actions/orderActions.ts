'use server';

import { Order, CreateOrderRequest, UpdateOrderRequest } from '@/types/orders';
import { orderService } from '../orderService';
import { createAction, updateAction, deleteAction, ActionResponse } from './createApiActions';
import { z } from 'zod';

// Interface específica para la respuesta de creación de orden
export const createOrderAction = async (data: CreateOrderRequest): Promise<ActionResponse<Order>> => {
  try {
    data.saleDate = new Date();
    data.saleDate.toISOString();
    const res = await createAction(orderService, data);
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
  data: UpdateOrderRequest,
  id: string,
): Promise<ActionResponse<Order>> => {
  try {
    const resp = await updateAction(orderService, id, data);
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
