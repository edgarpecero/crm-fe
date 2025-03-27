import { createApiService } from './createApiService';
import { Inventory, ListInventoryResponse, InventoryRequest } from '@/types/inventory';

export const inventoryService = createApiService<Inventory, ListInventoryResponse, InventoryRequest>('/inventory');
