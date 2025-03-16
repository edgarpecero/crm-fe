import { apiFetch } from '@/services/config/config';

const endpoint = '/orders';

// GET all orders
export const getAllOrders = async (): Promise<Order[]> => {
  return apiFetch<Order[]>(endpoint, { cache: 'no-store' }); // Para Server Components
};

// GET single order
export const getOrderById = async (id: string): Promise<Order> => {
  return apiFetch<Order>(`${endpoint}/${id}`);
};

// POST create order
export const createOrder = async (data: Omit<Order, 'id' | 'createdAt | lastModifiedAt '>): Promise<Order> => {
  return apiFetch<Order>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// PUT update order
export const updateOrder = async (id: string, data: Partial<Order>): Promise<Order> => {
  return apiFetch<Order>(`${endpoint}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// DELETE order
export const deleteOrder = async (id: string): Promise<void> => {
  await apiFetch<void>(`${endpoint}/${id}`, { method: 'DELETE' });
};