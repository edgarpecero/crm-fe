'use server';

import { User, UserRequest } from '@/types/users';
import { userService } from '../userService';
import { createAction, updateAction, deleteAction, ActionResponse } from './createApiActions';
import { z } from 'zod';

export const createUserAction = async (data: UserRequest): Promise<ActionResponse<User>> => {
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

export const updateUserAction = async (
  id: string,
  data: UserRequest,
): Promise<ActionResponse<User>> => {
  try {
    const resp = await updateAction(userService, id, processData(data));

    return {
      success: true,
      message: 'Usuario actualizado con éxito',
      data: resp as User,
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

export const deleteUserAction = async (id: string): Promise<void> => {
  deleteAction(userService, id);
};

const processData = (data: UserRequest): UserRequest => {
  //TODO: Add logic to format data before sending
  return data;
};
