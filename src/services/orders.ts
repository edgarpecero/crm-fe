import { apiFetch } from '@/services/config';
import { ListOrdersResponse, Order } from '@/types/orders';

export const endpoint = '/orders';

// GET all orders
export const getAllOrders = async (): Promise<Order[]> => {
  return (await apiFetch<ListOrdersResponse>(endpoint)).orders;
};

// GET single order
export const getOrderById = async (orderId: string, customerId?: string): Promise<Order> =>
  apiFetch<Order>(`${endpoint}/${orderId}${customerId ? `?customerId=${customerId}` : ''}`);
