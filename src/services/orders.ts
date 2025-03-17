import { apiFetch } from '@/services/config';
import { ListOrdersResponse, Order } from '@/types/orders';

export const endpoint = '/orders';

// GET all orders
export const getAllOrders = async (): Promise<Order[]> => {
  return (await apiFetch<ListOrdersResponse>(endpoint)).orders;
};

// GET single order
export const getOrderById = async (id: string): Promise<Order> => {
  return apiFetch<Order>(`${endpoint}/${id}`);
};