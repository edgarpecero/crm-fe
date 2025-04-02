import { z } from 'zod';
import { User } from '../users';
import { customerSchema } from '@/helpers/schemas';

interface Customer extends User {
  taxNumber: string;
  licenseNumber: string;
  licenseExpiration: string;
}
type CreateCustomerRequest = z.infer<typeof customerSchema>;
type UpdateCustomerRequest = z.infer<typeof customerSchema>;
type CustomerRequest = z.infer<typeof customerSchema>;
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
