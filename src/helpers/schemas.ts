import { z } from 'zod';

export const baseEntitySchema = z.object({
  id: z.string().optional().nullable(),
  number: z.string().optional().nullable(), // Unique identifier
  status: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(), // ISO 8601 string
  lastModifiedAt: z.string().optional().nullable(), // ISO 8601 string
  lastModifiedBy: z.string().optional().nullable(),
});

export const userSchema = z.object({
  id: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  name: z.string().optional().nullable(), // Cambiado a opcional
  lastName: z.string().optional().nullable(), // Cambiado a opcional
  email: z.string().email().optional().nullable(), // Cambiado a opcional
  birthdate: z.string().optional().nullable(), // Cambiado a opcional
  phone: z.string().optional().nullable(), // Cambiado a opcional
  phoneSecondary: z.string().optional().nullable(), // Cambiado a opcional
  address: z.string().optional().nullable(), // Cambiado a opcional
  addressSecondary: z.string().optional().nullable(), // Cambiado a opcional
  city: z.string().optional().nullable(), // Cambiado a opcional
  state: z.string().optional().nullable(), // Cambiado a opcional
  country: z.string().optional().nullable(), // Cambiado a opcional

  zip: z.string().optional().nullable(), // Cambiado a opcional
  nationalId: z.string().optional().nullable(), // Cambiado a opcional
});

export const customerSchema = userSchema.extend({
  taxNumber: z.string().max(50).optional().nullable(),
  licenseNumber: z.string().max(50).optional().nullable(),
  licenseExpiration: z.string().optional().nullable(),
});

export const orderSchema = z.object({
  accumulatedAmount: z.number().optional().nullable(), // ACUMULADO
  actualContribution: z.number().optional().nullable(), // AP REAL
  advancedPayments: z.number().int().nonnegative().optional().nullable(), // PAGOS ADELANTADOS
  agreementNumber: z.string().max(50).optional().nullable(), // Número de acuerdo
  agreementType: z.string().max(50).optional().nullable(), // Tipo de acuerdo
  amountPaid: z.number().optional().nullable(), // PAGADO
  contracts: z.number().int().positive().optional().nullable(), // Contratos (entero positivo)
  customer: customerSchema.optional().nullable(), // Referencia al schema del cliente
  dailyInterest: z.number().optional().nullable(), // INT DIARIO
  description: z.string().max(500).optional().nullable(),
  downPayment: z.number().optional().nullable(), // ENGANCHE
  excessAmount: z.number().optional().nullable(), // EXCEDENTE
  fifthPayment: z.number().optional().nullable(), // 5TA
  fourthPayment: z.number().optional().nullable(), // 4TA
  interestRate: z.number().optional().nullable(), // TASA DE INTERÉS
  itemId: z.string().optional().nullable(), // ID del producto
  itemName: z.string().optional().nullable(), // Nombre del producto
  mark: z.string().max(50).optional().nullable(), // Marca
  monthlyPayment: z.number().optional().nullable(), // Mensual
  onTimePayments: z.number().optional().nullable(), // PAGO PUNTUAL
  overduePayments: z.number().optional().nullable(), // PAGO VENCIDO
  saleDate: z.string().optional().nullable(), // Instant como ISO string
  secondPayment: z.number().optional().nullable(), // 2DA
  sixthPayment: z.number().optional().nullable(), // 6TA
  termMonths: z.number().int().positive().optional().nullable(), // PLAZO (entero positivo)
  thirdPayment: z.number().optional().nullable(), // 3RA
  totalAmount: z.number().optional().nullable(), // BigDecimal como number en JS
  totalPayments: z.number().int().nonnegative().optional().nullable(), // PAGOS (entero no negativo)
  userId: z.string().optional().nullable(), // ID del vendedor
  username: z.string().optional().nullable(), // Nombre del vendedor
});

export const inventorySchema = z.object({
  // Campos de Inventory
  sku: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  price: z.bigint().optional().nullable(), // o z.number() si prefieres decimales
  quantityStock: z.number().optional().nullable(),
  type: z.string().optional().nullable(),
  vendor: z.string().optional().nullable(),

  // Campos de Vehicle
  manufacturer: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  year: z.number().optional().nullable(),
  vin: z.string().optional().nullable(),
  fuelType: z.string().optional().nullable(),
  kilometers: z.number().optional().nullable(),
  color: z.string().optional().nullable(),
});

export const createOrderSchema = orderSchema;
export const updateOrderSchema = orderSchema;
export const createUserSchema = userSchema;
export const updateUserSchema = userSchema;
export const createCustomerSchema = customerSchema;
export const updateCustomerSchema = customerSchema;
export const createInventorySchema = inventorySchema;
export const updateInventorySchema = inventorySchema;

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;
export type CreateInventorySchema = z.infer<typeof createInventorySchema>;
export type UpdateInventorySchema = z.infer<typeof updateInventorySchema>;
export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>;

export type OrderSchema = z.infer<typeof orderSchema>;
export type UserSchema = z.infer<typeof userSchema>;
export type CustomerSchema = z.infer<typeof customerSchema>;
export type InventorySchema = z.infer<typeof inventorySchema>;
