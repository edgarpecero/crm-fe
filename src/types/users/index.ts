import { userSchema } from '@/helpers/schemas';
import { BaseEntity } from '../BaseEntity';
import { z } from 'zod';

interface User extends BaseEntity {
  cognitoUserId?: string;
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
type CreateUserRequest = z.infer<typeof userSchema>;
type UpdateUserRequest = z.infer<typeof userSchema>;
type UserRequest = z.infer<typeof userSchema>;
interface ListUsersResponse {
  users: User[];
  count: number;
}

export type { User, ListUsersResponse, CreateUserRequest, UpdateUserRequest, UserRequest };
