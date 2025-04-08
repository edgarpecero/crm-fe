'use server';

import { User, UpdateUserRequest, CreateUserRequest } from '@/types/users';
import { userService } from '../userService';
import { createAction, updateAction, deleteAction, ActionResponse } from './createApiActions';
import { z } from 'zod';

export const createUserAction = async (data: CreateUserRequest): Promise<ActionResponse<User>> => {
  try {
    data.birthdate.toISOString();
    const res = await createAction(userService, data);
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
  data: UpdateUserRequest,
  id: string,
): Promise<ActionResponse<User>> => {
  try {
    const resp = await updateAction(userService, id, data);

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

