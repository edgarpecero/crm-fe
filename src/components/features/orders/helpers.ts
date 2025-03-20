import { z } from 'zod';
import { InputsProps } from "@/components/ui/GridInputs/types";
import { Order } from '@/types/orders';

const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  name: z.string().optional(), // Cambiado a opcional
  lastName: z.string().optional(), // Cambiado a opcional
  email: z.string().email().optional(), // Cambiado a opcional
  birthdate: z.string().optional(), // Cambiado a opcional
  phone: z.string().optional(), // Cambiado a opcional
  phoneSecondary: z.string().optional(), // Cambiado a opcional
  address: z.string().optional(), // Cambiado a opcional
  addressSecondary: z.string().optional(), // Cambiado a opcional
  city: z.string().optional(), // Cambiado a opcional
  state: z.string().optional(), // Cambiado a opcional
  country: z.string().optional(), // Cambiado a opcional
  zip: z.string().optional(), // Cambiado a opcional
  nationalId: z.string().optional(), // Cambiado a opcional
});

const customerSchema = userSchema.extend({
  taxNumber: z.string().max(50).optional(),
  licenseNumber: z.string().max(50).optional(),
  licenseExpiration: z.string().optional(),
});

const orderSchema = z.object({
  userId: z.string(), // ID del vendedor
  userName: z.string(), // Nombre del vendedor
  itemId: z.string(), // ID del producto
  itemName: z.string(), // Nombre del producto
  customer: customerSchema, // Referencia al schema del cliente
  description: z.string().max(500),

  totalAmount: z.number(), // BigDecimal como number en JS
  totalPayments: z.number().int().nonnegative(), // PAGOS (entero no negativo)
  interestRate: z.number(), // TASA DE INTERÉS
  onTimePayments: z.number().optional(), // PAGO PUNTUAL
  termMonths: z.number().int().positive().optional(), // PLAZO (entero positivo)
  advancedPayments: z.number().int().nonnegative(), // PAGOS ADELANTADOS
  monthlyPayment: z.number().optional(), // Mensual
  overduePayments: z.number().optional(), // PAGO VENCIDO
  agreementType: z.string().max(50), // Tipo de acuerdo
  agreementNumber: z.string().max(50), // Número de acuerdo
  mark: z.string().max(50), // Marca
  contracts: z.number().int().positive().optional(), // Contratos (entero positivo)
  actualContribution: z.number(), // AP REAL
  downPayment: z.number(), // ENGANCHE
  excessAmount: z.number(), // EXCEDENTE
  saleDate: z.string().datetime(), // Instant como ISO string
  dailyInterest: z.number(), // INT DIARIO
  accumulatedAmount: z.number(), // ACUMULADO
  amountPaid: z.number(), // PAGADO
  secondPayment: z.number(), // 2DA
  thirdPayment: z.number(), // 3RA
  fourthPayment: z.number(), // 4TA
  fifthPayment: z.number(), // 5TA
  sixthPayment: z.number(), // 6TA
  lastModifiedBy: z.string().max(100),
}).partial();
export const createOrderSchema = orderSchema;
export const updateOrderSchema = orderSchema;
export const createUserSchema = userSchema;
export const updateUserSchema = userSchema;
export const createCustomerSchema = customerSchema;
export const updateCustomerSchema = customerSchema;

type OrderSchema = z.infer<typeof orderSchema>;
export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;

export const trasformOrderToOrderSchema = (order?: Order): Partial<CreateOrderSchema | UpdateOrderSchema> => ({
  ...order,
  customer: {
    id: order?.customerId || "",
    name: order?.customerName || "",
  }
});

export const defaultValues: Partial<CreateOrderSchema | UpdateOrderSchema> = {
  userId: "Edgar",
  userName: "Edgar",
  itemId: "123",
  itemName: "123",
  customer: {
    id: "",
    name: "",
    lastName: "",
    email: "",
    birthdate: "",
    phone: "",
    phoneSecondary: "",
    address: "",
    addressSecondary: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    nationalId: "",
    taxNumber: "",
    licenseNumber: "",
    licenseExpiration: "",
  },
  totalAmount: 0,
  totalPayments: 1,
  interestRate: 0,
  onTimePayments: 0,
  termMonths: 0,
  advancedPayments: 0,
  monthlyPayment: 0,
  overduePayments: 0,
  agreementNumber: "",
  agreementType: "",
  contracts: 0,
  mark: "",
  lastModifiedBy: "Edgar",
};

export const userAttributesInputs = (parent: string = 'user'): InputsProps[] => (
  [
    { name: `${parent}.name`, label: 'Nombre', required: true },
    { name: `${parent}.lastName`, label: 'Apellido', required: true },
    { name: `${parent}.email`, label: 'Email', required: true },
    { name: `${parent}.birthdate`, label: 'Fecha de nacimiento', required: true },
    { name: `${parent}.phone`, label: 'Teléfono principal', required: true },
    { name: `${parent}.phoneSecondary`, label: 'Teléfono secundario' },
    { name: `${parent}.nationalId`, label: 'ID' },
    { name: `${parent}.taxNumber`, label: 'RFC' },
    { name: `${parent}.licenseNumber`, label: 'Número de licencia' },
    { name: `${parent}.licenseExpiration`, label: 'Fecha de expiración de la licencia' },
    // slice(10, 16) to get address inputs
    { name: `${parent}.address`, label: 'Dirección', gridSize: { xs: 12, sm: 12 }, required: true },
    { name: `${parent}.addressSecondary`, label: 'Colonia', gridSize: { xs: 12, sm: 12 }, required: true },
    { name: `${parent}.city`, label: 'Ciudad', required: true },
    { name: `${parent}.state`, label: 'Estado', required: true },
    { name: `${parent}.country`, label: 'País', required: true },
    { name: `${parent}.zip`, label: 'Código postal', required: true },
  ]
);
export const getUserInputsForOrderRequest = (isLicense: boolean = true, parent: string = 'customer') => (
  isLicense ? userAttributesInputs(parent).slice(0, 10) : userAttributesInputs(parent).slice(0, 8)
);
export const getUserAddressInputsForOrderRequest = (parent: string = 'customer') => (
  userAttributesInputs(parent).slice(10, 16)
);

const paymentCommonProps = { gridSize: { xs: 12, sm: 3 }, disabled: false, type: 'number' };
const paymentInputCommonProps = { gridSize: { xs: 12, sm: 9 }, required: true, type: 'number' };
export const contractInputs: InputsProps[] = [
  { name: 'totalAmount', label: 'Saldo Mensual', ...paymentInputCommonProps },
  { name: 'totalPayments', label: 'Mens Pag', ...paymentCommonProps },
  { name: 'interestRate', label: 'Tasa', ...paymentInputCommonProps },
  { name: 'onTimePayments', label: 'Mens Punt', ...paymentCommonProps },
  { name: 'termMonths', label: '# No. Adjud', ...paymentInputCommonProps },
  { name: 'advancedPayments', label: 'Mens Adela', ...paymentCommonProps },
  { name: 'monthlyPayment', label: 'Mensualidad', ...paymentInputCommonProps },
  { name: 'overduePayments', label: 'Mens Venci', ...paymentCommonProps },
  { name: 'agreementNumber', label: 'Convenio', },
  { name: 'agreementType', label: 'Tipo de Convenio', },
  { name: 'contracts', label: 'Contratos', type: 'number' },
  { name: 'mark', label: 'Azul', },
];
export const contractInputsSectionOne = contractInputs.slice(0, 8);
export const contractInputsSectionTwo = contractInputs.slice(8, 12);
