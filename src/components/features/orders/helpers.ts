import { z } from 'zod';
import { InputsProps } from '@/components/ui/GridInputs/types';
import { CreateOrderRequest, Order, UpdateOrderRequest } from '@/types/orders';
import { DefaultValues } from 'react-hook-form';


const userSchema = z.object({
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

const customerSchema = userSchema.extend({
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
  lastModifiedBy: z.string().max(100).optional().nullable(),
  mark: z.string().max(50).optional().nullable(), // Marca
  monthlyPayment: z.number().optional().nullable(), // Mensual
  onTimePayments: z.number().optional().nullable(), // PAGO PUNTUAL
  overduePayments: z.number().optional().nullable(), // PAGO VENCIDO
  saleDate: z.string().datetime().optional().nullable(), // Instant como ISO string
  secondPayment: z.number().optional().nullable(), // 2DA
  sixthPayment: z.number().optional().nullable(), // 6TA
  termMonths: z.number().int().positive().optional().nullable(), // PLAZO (entero positivo)
  thirdPayment: z.number().optional().nullable(), // 3RA
  totalAmount: z.number().optional().nullable(), // BigDecimal como number en JS
  totalPayments: z.number().int().nonnegative().optional().nullable(), // PAGOS (entero no negativo)
  userId: z.string().optional().nullable(), // ID del vendedor
  userName: z.string().optional().nullable(), // Nombre del vendedor
});
export type OrderSchema = z.infer<typeof orderSchema>;

export const createOrderSchema = orderSchema;
export const updateOrderSchema = orderSchema;
export const createUserSchema = userSchema;
export const updateUserSchema = userSchema;
export const createCustomerSchema = customerSchema;
export const updateCustomerSchema = customerSchema;

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;

export const defaultValues: OrderSchema = {
  accumulatedAmount: 0,
  actualContribution: 0,
  advancedPayments: 0,
  agreementNumber: "",
  agreementType: "",
  amountPaid: 0,
  contracts: 0,
  customer: {
    id: "",
    username: "",
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
  dailyInterest: 0,
  description: "",
  downPayment: 0,
  excessAmount: 0,
  fifthPayment: 0,
  fourthPayment: 0,
  interestRate: 0,
  itemId: "",
  itemName: "",
  lastModifiedBy: "",
  mark: "",
  monthlyPayment: 0,
  onTimePayments: 0,
  overduePayments: 0,
  saleDate: "",
  secondPayment: 0,
  sixthPayment: 0,
  termMonths: 0,
  thirdPayment: 0,
  totalAmount: 0,
  totalPayments: 0,
  userId: "",
  userName: "Admin",
};

export const userAttributesInputs = (parent: string = 'user'): InputsProps[] => [
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
  {
    name: `${parent}.addressSecondary`,
    label: 'Colonia',
    gridSize: { xs: 12, sm: 12 },
    required: true,
  },
  { name: `${parent}.city`, label: 'Ciudad', required: true },
  { name: `${parent}.state`, label: 'Estado', required: true },
  { name: `${parent}.country`, label: 'País', required: true },
  { name: `${parent}.zip`, label: 'Código postal', required: true },
];
export const getUserInputsForOrderRequest = (
  isLicense: boolean = true,
  parent: string = 'customer',
) =>
  isLicense ? userAttributesInputs(parent).slice(0, 10) : userAttributesInputs(parent).slice(0, 8);
export const getUserAddressInputsForOrderRequest = (parent: string = 'customer') =>
  userAttributesInputs(parent).slice(10, 16);

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
  { name: 'agreementNumber', label: 'Convenio' },
  { name: 'agreementType', label: 'Tipo de Convenio' },
  { name: 'contracts', label: 'Contratos', type: 'number' },
  { name: 'mark', label: 'Azul' },
];
export const contractInputsSectionOne = contractInputs.slice(0, 8);
export const contractInputsSectionTwo = contractInputs.slice(8, 12);

export const trasformOrderToOrderSchema = (initialOrder?: Order): OrderSchema => {
  if (!initialOrder) return defaultValues;
  return {
    accumulatedAmount: initialOrder.accumulatedAmount,
    actualContribution: initialOrder.actualContribution,
    advancedPayments: initialOrder.advancedPayments,
    agreementNumber: initialOrder.agreementNumber,
    agreementType: initialOrder.agreementType,
    amountPaid: initialOrder.amountPaid,
    contracts: initialOrder.contracts,
    customer: {
      id: initialOrder.customer.id,
      username: initialOrder.customer.username,
      name: initialOrder.customer.name,
      lastName: initialOrder.customer.lastName,
      email: initialOrder.customer.email,
      birthdate: initialOrder.customer.birthdate,
      phone: initialOrder.customer.phone,
      phoneSecondary: initialOrder.customer.phoneSecondary,
      address: initialOrder.customer.address,
      addressSecondary: initialOrder.customer.addressSecondary,
      city: initialOrder.customer.city,
      state: initialOrder.customer.state,
      country: initialOrder.customer.country,
      zip: initialOrder.customer.zip,
      nationalId: initialOrder.customer.nationalId,
      taxNumber: initialOrder.customer.taxNumber,
      licenseNumber: initialOrder.customer.licenseNumber,
      licenseExpiration: initialOrder.customer.licenseExpiration,
    },
    dailyInterest: initialOrder.dailyInterest,
    description: initialOrder.description,
    downPayment: initialOrder.downPayment,
    excessAmount: initialOrder.excessAmount,
    fifthPayment: initialOrder.fifthPayment,
    fourthPayment: initialOrder.fourthPayment,
    interestRate: initialOrder.interestRate,
    itemId: initialOrder.itemId,
    itemName: initialOrder.itemName,
    lastModifiedBy: initialOrder.lastModifiedBy,
    mark: initialOrder.mark,
    monthlyPayment: initialOrder.monthlyPayment,
    onTimePayments: initialOrder.onTimePayments,
    overduePayments: initialOrder.overduePayments,
    saleDate: initialOrder.saleDate,
    secondPayment: initialOrder.secondPayment,
    sixthPayment: initialOrder.sixthPayment,
    termMonths: initialOrder.termMonths,
    thirdPayment: initialOrder.thirdPayment,
    totalAmount: initialOrder.totalAmount,
    totalPayments: initialOrder.totalPayments,
    userId: initialOrder.userId,
    userName: initialOrder.userName,
  };
};