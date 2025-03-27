import { ListUsersResponse, User, UserRequest } from '@/types/users';
import { createApiService } from './createApiService';

export const userService = createApiService<User, ListUsersResponse, UserRequest>('/users');
