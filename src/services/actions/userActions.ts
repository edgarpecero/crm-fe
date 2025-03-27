'use server';

import { User, UserRequest } from '@/types/users';
import { userService } from '../userService';
import { createAction, updateAction, deleteAction } from './createApiActions';
import { z } from 'zod';
import { userSchema } from '@/components/features/orders/helpers';

export const createUserAction = async (data: UserRequest) => {
  try {
    const res = await createAction(userService, processData(data));
    return {
      success: true,
      message: 'Usuario creado con éxito',
      data: res as User,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      };
    }
    return {
      success: false,
      message: 'Error en el servidor',
    };
  }
};

export const updateUserAction = async (id: string, data: UserRequest): Promise<User> => {
  const resp = await updateAction(userService, id, processData(data) as User);
  console.log('resp', resp);
  return resp as User;
};

export const deleteUserAction = async (id: string): Promise<void> => {
  deleteAction(userService, id);
};

const processData = (data: UserRequest): UserRequest => {
  const validatedData = userSchema.parse(data);

  if (validatedData?.birthdate) {
    const date = new Date(validatedData.birthdate);
    validatedData.birthdate = date.toISOString();
  }

  return validatedData as UserRequest;
};
