import { createUserSchema, updateUserSchema } from '@/helpers/schemas';
import { BaseEntity, BasicContact } from '../BaseEntity';
import { z } from 'zod';

interface UserBase extends BaseEntity {
  cognitoUserId?: string;
  username: string;
  name: string;
  lastName: string;
  birthdate: string;
}
type User = UserBase & BasicContact;
type CreateUserRequest = z.infer<typeof createUserSchema>;
type UpdateUserRequest = z.infer<typeof updateUserSchema>;
interface ListUsersResponse {
  users: User[];
  count: number;
}

export type { User, ListUsersResponse, CreateUserRequest, UpdateUserRequest };