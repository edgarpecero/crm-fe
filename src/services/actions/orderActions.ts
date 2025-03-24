'use server';

import { Order } from '@/types/orders';
import { orderService } from '../orderService';
import { createAction, updateAction, deleteAction } from './createApiActions';

export const createOrderAction = async (data: Order): Promise<Order> => {
  return createAction(orderService, data);
};

export const updateOrderAction = async (id: string, data: Partial<Order>): Promise<Order> => {
  return updateAction(orderService, id, data);
};

export const deleteOrderAction = async (id: string): Promise<void> => {
  deleteAction(orderService, id);
};
