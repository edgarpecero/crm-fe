import { createApiService } from './createApiService';
import { Inventory, ListInventoryResponse } from '@/types/inventory';

export const inventoryService = createApiService<Inventory, ListInventoryResponse>('/inventory');
