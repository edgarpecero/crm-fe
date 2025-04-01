import { orderSchema } from '@/helpers/schemas';
import { BaseEntity } from '../BaseEntity';
import { z } from 'zod';

interface Inventory extends BaseEntity {
  // Inventory
  sku: string;
  name: string;
  description: string;
  price: bigint; // O usa number si prefieres decimales
  quantityStock: number;
  type: string;
  vendor: string;
  // Vehicle
  manufacturer: string;
  model: string;
  year: number;
  vin: string;
  fuelType: string;
  kilometers: number;
  color: string;
}

type CreateInventoryRequest = z.infer<typeof orderSchema>;
type UpdateInventoryRequest = z.infer<typeof orderSchema>;
type InventoryRequest = z.infer<typeof orderSchema>;
interface ListInventoryResponse {
  items: Inventory[];
  count: number;
}

export type {
  Inventory,
  ListInventoryResponse,
  CreateInventoryRequest,
  UpdateInventoryRequest,
  InventoryRequest,
};
