'use server';

import { User } from '@/types/users';
import { userService } from '../userService';
import { createAction, updateAction, deleteAction } from './createApiActions';

export const createUserAction = async (data: User): Promise<User> => {
  return createAction(userService, data);
};

export const updateUserAction = async (id: string, data: Partial<User>): Promise<User> => {
  return updateAction(userService, id, data);
};

export const deleteUserAction = async (id: string): Promise<void> => {
  deleteAction(userService, id);
};
