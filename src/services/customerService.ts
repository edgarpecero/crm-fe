import { createApiService } from './createApiService';
import { Customer, ListCustomersResponse } from '@/types/customers';

export const customerService = createApiService<Customer, ListCustomersResponse>('/customers');
