import { z } from 'zod';
import { User } from '../users';
import { createCustomerSchema, updateCustomerSchema } from '@/helpers/schemas';
import { BasicContact } from '../BaseEntity';

interface CustomerBeneficiaryBase {
  name: string;
  lastName: string;
  relationship: string;
  birthdate: number;
}
type CustomerBeneficiary = CustomerBeneficiaryBase & BasicContact;
interface CustomerWorkplaceBase {
  name: string;
  startDate: string;
  position: string;
  salary: number;
  otherIncome?: number;
}
type CustomerWorkplace = CustomerWorkplaceBase & BasicContact;

interface CustomerBase extends User {
  maritalStatus: string;
  taxNumber: string;
}
type Customer = CustomerBase & {
  workplace: CustomerWorkplace;
  beneficiary: CustomerBeneficiary;
}
type CreateCustomerRequest = z.infer<typeof createCustomerSchema>;
type UpdateCustomerRequest = z.infer<typeof updateCustomerSchema>;
interface ListCustomersResponse {
  costumers: Customer[];
  count: number;
}

export type {
  Customer,
  ListCustomersResponse,
  CreateCustomerRequest,
  UpdateCustomerRequest,
};
