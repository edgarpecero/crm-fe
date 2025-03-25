import { ListOrdersResponse, Order, OrderRequest } from '@/types/orders';
import { createApiService } from './createApiService';

export const orderService = createApiService<Order, ListOrdersResponse, OrderRequest>('/orders');
