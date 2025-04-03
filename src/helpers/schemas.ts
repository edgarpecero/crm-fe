import { parseISO } from 'date-fns';
import { z } from 'zod';

// Reusable validators
const BaseInventorySchema = z.object({
  status: z.string(),
  sku: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantityStock: z.number().int(),
  type: z.string(),
  manufacturer: z.string(),
  model: z.string(),
  year: z.number().int(),
  vin: z.string(),
  fuelType: z.string(),
  kilometers: z.number(),
  color: z.string(),
});

// UpdateInventoryRequest: all vehicle fields optional
export const UpdateInventoryRequestSchema = BaseInventorySchema.partial({
  manufacturer: true,
  model: true,
  year: true,
  vin: true,
  fuelType: true,
  kilometers: true,
  color: true,
});

// CreateInventoryRequest: most fields required with validation
export const CreateInventoryRequestSchema = BaseInventorySchema.extend({
  sku: z.string().min(1, 'SKU no puede estar vacío'),
  name: z.string().min(1, 'Nombre no puede estar vacío'),
  description: z.string().min(1, 'Descripción no puede estar vacía'),
  price: z.number().refine((val) => val !== null && val !== undefined, 'El precio es requerido'),
  quantityStock: z
    .number()
    .int()
    .refine((val) => val !== null && val !== undefined, 'La cantidad en stock es requerida'),
  type: z.string().min(1, 'Tipo no puede estar vacío'),
  manufacturer: z.string().min(1, 'Fabricante no puede estar vacío'),
  model: z.string().min(1, 'Modelo no puede estar vacío'),
  year: z
    .number()
    .int()
    .refine((val) => val !== null && val !== undefined, 'El año es requerido'),
  vin: z.string().min(1, 'VIN no puede estar vacío'),
  fuelType: z.string().min(1, 'Tipo de combustible no puede estar vacío'),
  kilometers: z
    .number()
    .refine((val) => val !== null && val !== undefined, 'Kilómetros es requerido'),
  color: z.string().optional(),
});

export type UpdateInventoryRequest = z.infer<typeof UpdateInventoryRequestSchema>;
export type CreateInventoryRequest = z.infer<typeof CreateInventoryRequestSchema>;

export const userSchema = z.object({
  id: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  name: z.string().optional().nullable(), // Cambiado a opcional
  lastName: z.string().optional().nullable(), // Cambiado a opcional
  email: z.string().email().optional().nullable(), // Cambiado a opcional
  // birthdate: z.string().optional().nullable(), // Cambiado a opcional
  birthdate: z.preprocess(
    (val) => (typeof val === 'string' ? parseISO(val) : val),
    z.date().min(new Date('1901-01-01')).optional().nullable()
  ),
  phone: z.string().optional().nullable(), // Cambiado a opcional
  phoneSecondary: z.string().optional().nullable(), // Cambiado a opcional
  address: z.string().optional().nullable(), // Cambiado a opcional
  addressSecondary: z.string().optional().nullable(), // Cambiado a opcional
  city: z.string().optional().nullable(), // Cambiado a opcional
  state: z.string().optional().nullable(), // Cambiado a opcional
  country: z.string().optional().nullable(), // Cambiado a opcional
  status: z.string().optional().nullable(),

  zip: z.string().optional().nullable(), // Cambiado a opcional
  nationalId: z.string().optional().nullable(), // Cambiado a opcional
  maritalStatus: z.string().optional().nullable(), // Cambiado a opcional
});

export const customerSchema = userSchema.extend({
  taxNumber: z.string().max(50).optional().nullable(),
  licenseNumber: z.string().max(50).optional().nullable(),
  licenseExpiration: z.preprocess(
    (val) => (typeof val === 'string' ? parseISO(val) : val),
    z.date().min(new Date('1901-01-01')).optional().nullable()
  ),// Cambiado a opcional
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
  status: z.string().optional().nullable(),
  secondPayment: z.number().optional().nullable(), // 2DA
  sixthPayment: z.number().optional().nullable(), // 6TA
  termMonths: z.number().int().positive().optional().nullable(), // PLAZO (entero positivo)
  thirdPayment: z.number().optional().nullable(), // 3RA
  totalAmount: z.number().optional().nullable(), // BigDecimal como number en JS
  totalPayments: z.number().int().nonnegative().optional().nullable(), // PAGOS (entero no negativo)
  userId: z.string().optional().nullable(), // ID del vendedor
  userName: z.string().optional().nullable(), // Nombre del vendedor
});

export const inventorySchema = z.object({
  // Campos de Inventory
  sku: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  price: z.number().optional().nullable(), // o z.number() si prefieres decimales
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

export const updateUserRequestSchema = z.object({
  status: z.string().optional(),
  username: z.string().optional(),
  name: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: 'El correo electrónico debe ser válido' }).optional(),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD',
    })
    .optional(),
  phone: z.string().optional(),
  phoneSecondary: z.string().optional(),
  address: z.string().optional(),
  addressSecondary: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zip: z.string().optional(),
  nationalId: z.string().optional(),
  maritalStatus: z.string().optional(),
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
