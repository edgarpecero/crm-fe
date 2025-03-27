import { createApiService } from './createApiService';
import { Customer, ListCustomersResponse, CustomerRequest } from '@/types/customers';

export const customerService = createApiService<Customer, ListCustomersResponse, CustomerRequest>(
  '/customers',
);
