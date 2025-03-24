import { ListOrdersResponse, Order } from '@/types/orders';
import { createApiService } from './createApiService';

export const orderService = createApiService<Order, ListOrdersResponse>('/orders');
