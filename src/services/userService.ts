import { CreateUserRequest, ListUsersResponse, UpdateUserRequest, User } from '@/types/users';
import { createApiService } from './createApiService';

export const userService = 
  createApiService<User, ListUsersResponse, CreateUserRequest, UpdateUserRequest>('/users');
