import * as schemas from '@/components/features/orders/helpers';
import { BaseEntity } from '../BaseEntity';
import { z } from 'zod';

interface User extends BaseEntity {
  cognitoUserId: string;
  username: string;
  name: string;
  lastName: string;
  email: string;
  birthdate: string;
  phone: string;
  phoneSecondary: string;
  address: string;
  addressSecondary: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  nationalId: string;
  maritalStatus: string;
}
type CreateUserRequest = z.infer<typeof schemas.createOrderSchema>;
type UpdateUserRequest = z.infer<typeof schemas.updateOrderSchema>;
interface ListUsersResponse {
  users: User[];
  count: number;
}

export type { User, ListUsersResponse, CreateUserRequest, UpdateUserRequest };
