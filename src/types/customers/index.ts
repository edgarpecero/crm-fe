import { z } from 'zod';
import { User } from '../users';
import { orderSchema } from '@/helpers/schemas';

interface Customer extends User {
  taxNumber: string;
  licenseNumber: string;
  licenseExpiration: string;
}
type CreateCustomerRequest = z.infer<typeof orderSchema>;
type UpdateCustomerRequest = z.infer<typeof orderSchema>;
type CustomerRequest = z.infer<typeof orderSchema>;
interface ListCustomersResponse {
  costumers: Customer[];
  count: number;
}
export type {
  Customer,
  ListCustomersResponse,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerRequest,
};
