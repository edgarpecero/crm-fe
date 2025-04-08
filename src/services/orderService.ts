import { CreateOrderRequest, ListOrdersResponse, Order, UpdateOrderRequest } from '@/types/orders';
import { createApiService } from './createApiService';

export const orderService = createApiService<
  Order,
  ListOrdersResponse,
  CreateOrderRequest,
  UpdateOrderRequest
>('/orders');
