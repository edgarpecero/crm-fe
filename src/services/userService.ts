import { ListUsersResponse, User } from '@/types/users';
import { createApiService } from './createApiService';

export const userService = createApiService<User, ListUsersResponse>('/users');
