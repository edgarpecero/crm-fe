import * as schemas from '@/components/features/orders/helpers';
import { z } from 'zod';
import { User } from '../users';

interface Customer extends User {
  taxNumber: string;
  licenseNumber: string;
  licenseExpiration: string;
}
type CreateCustomerRequest = z.infer<typeof schemas.createOrderSchema>;
type UpdateCustomerRequest = z.infer<typeof schemas.updateOrderSchema>;
interface ListCustomersResponse {
  customers: Customer[];
  count: number;
}
export type { Customer, ListCustomersResponse, CreateCustomerRequest, UpdateCustomerRequest };
