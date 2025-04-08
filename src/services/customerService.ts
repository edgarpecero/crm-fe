import { createApiService } from './createApiService';
import { Customer, ListCustomersResponse, CreateCustomerRequest, UpdateCustomerRequest } from '@/types/customers';

export const customerService =
  createApiService<
    Customer,
    ListCustomersResponse,
    CreateCustomerRequest,
    UpdateCustomerRequest
  >('/customers');
