import { createApiService } from './createApiService';
import {
  Inventory,
  ListInventoryResponse,
  CreateInventoryRequest,
  UpdateInventoryRequest,
} from '@/types/inventory';

export const inventoryService = createApiService<
  Inventory,
  ListInventoryResponse,
  CreateInventoryRequest,
  UpdateInventoryRequest
>('/inventory');
