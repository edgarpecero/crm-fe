'use JAJAJserver';

import { apiFetch } from '@/services/config';
import { endpoint } from '../orders';
import { Order } from '@/types/orders';

const shouldRevalidate = true;
// POST create order
export const createOrder = async (data: Order): Promise<Order> => {
  return apiFetch<Order>(
    endpoint,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    shouldRevalidate,
  );
};

// PUT update order
export const updateOrder = async (id: string, data: Partial<Order>): Promise<Order> => {
  return apiFetch<Order>(
    `${endpoint}/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    shouldRevalidate,
  );
};

// DELETE order
export const deleteOrder = async (id: string): Promise<void> => {
  await apiFetch<void>(`${endpoint}/${id}`, { method: 'DELETE' }, shouldRevalidate);
};
