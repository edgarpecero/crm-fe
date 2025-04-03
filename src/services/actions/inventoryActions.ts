'use server';

import { Inventory, InventoryRequest } from '@/types/inventory';
import { inventoryService } from '../inventoryService';
import { createAction, updateAction, deleteAction, ActionResponse } from './createApiActions';
import { z } from 'zod';

export const createInventoryAction = async (
  data: InventoryRequest,
): Promise<ActionResponse<Inventory>> => {
  try {
    const res = await createAction(inventoryService, processData(data));
    return {
      success: true,
      message: 'Inventario creado con éxito',
      data: res as Inventory,
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

export const updateInventoryAction = async (
  id: string,
  data: InventoryRequest,
): Promise<ActionResponse<Inventory>> => {
  try {
    const resp = await updateAction(inventoryService, id, processData(data));
    return {
      success: true,
      message: 'Inventario actualizado con éxito',
      data: resp as Inventory,
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

export const deleteInventoryAction = async (id: string): Promise<ActionResponse<void>> => {
  try {
    await deleteAction(inventoryService, id);
    return {
      success: true,
      message: 'Inventario eliminado con éxito',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al eliminar el inventario ' + error,
    };
  }
};

const processData = (data: InventoryRequest): InventoryRequest => {
  //TODO: Add logic to format data before sending
  return data;
};
