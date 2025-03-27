'use server';

import { Inventory } from '@/types/inventory';
import { inventoryService } from '../inventoryService';
import { createAction, updateAction, deleteAction } from './createApiActions';

export const createInventoryAction = async (data: Inventory): Promise<Inventory> => {
  return createAction(inventoryService, data);
};

export const updateInventoryAction = async (
  id: string,
  data: Partial<Inventory>,
): Promise<Inventory> => {
  return updateAction(inventoryService, id, data);
};

export const deleteInventoryAction = async (id: string): Promise<void> => {
  deleteAction(inventoryService, id);
};
