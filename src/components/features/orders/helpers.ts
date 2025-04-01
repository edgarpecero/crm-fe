import { InputsProps } from '@/components/ui/GridInputs/types';
import { Order } from '@/types/orders';
import { PageActionsEnum } from '@/types/enums';
import { OrderSchema } from '@/helpers/schemas';

export const defaultValues: OrderSchema = {
  userId: 'd7252b8e-124d-49d2-8fc1-bbf03a051d0f',
  username: 'Admin',
  itemName: 'Toyota Prius 2021',
  itemId: 'Admin',
  accumulatedAmount: 0,
  actualContribution: 0,
  advancedPayments: 0,
  agreementNumber: '',
  agreementType: '',
  amountPaid: 0,
  contracts: 0,
  customer: {
    id: '',
    username: '',
    name: '',
    lastName: '',
    email: '',
    birthdate: '',
    phone: '',
    phoneSecondary: '',
    address: '',
    addressSecondary: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    nationalId: '',
    taxNumber: '',
    licenseNumber: '',
    licenseExpiration: '',
  },
  dailyInterest: 0,
  description: '',
  downPayment: 0,
  excessAmount: 0,
  fifthPayment: 0,
  fourthPayment: 0,
  interestRate: 0,
  mark: '',
  monthlyPayment: 0,
  onTimePayments: 0,
  overduePayments: 0,
  saleDate: '',
  secondPayment: 0,
  sixthPayment: 0,
  termMonths: 0,
  thirdPayment: 0,
  totalAmount: 0,
  totalPayments: 0,
};

export const userAttributesInputs = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
  parent: string = '',
): InputsProps[] => {
  const isReadOnly = mode === PageActionsEnum.READONLY;
  const isCreate = mode === PageActionsEnum.CREATE;

  return [
    {
      name: `${parent}username`,
      label: 'Usuario',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}name`,
      label: 'Nombre',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}lastName`,
      label: 'Apellido',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}email`,
      label: 'Email',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}birthdate`,
      label: 'Fecha de nacimiento',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}phone`,
      label: 'Teléfono principal',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}phoneSecondary`,
      label: 'Teléfono secundario',
      disabled: isReadOnly,
    },
    {
      name: `${parent}nationalId`,
      label: 'ID',
      disabled: isReadOnly,
    },
    {
      name: `${parent}taxNumber`,
      label: 'RFC',
      disabled: isReadOnly,
    },
    {
      name: `${parent}licenseNumber`,
      label: 'Número de licencia',
      disabled: isReadOnly,
    },
    {
      name: `${parent}licenseExpiration`,
      label: 'Fecha de expiración de la licencia',
      disabled: isReadOnly,
    },
    {
      name: `${parent}address`,
      label: 'Dirección',
      gridSize: { xs: 12, sm: 12 },
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}addressSecondary`,
      label: 'Colonia',
      gridSize: { xs: 12, sm: 12 },
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}city`,
      label: 'Ciudad',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}state`,
      label: 'Estado',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}country`,
      label: 'País',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}zip`,
      label: 'Código postal',
      required: isCreate,
      disabled: isReadOnly,
    },
  ];
};
export const getUserInputs = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
  userAttributesInputs(mode).slice(0, 7);

export const getUserAddressInputs = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
  userAttributesInputs(mode).slice(11, 17);

export const getUserInputsForOrderRequest = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
  isLicense: boolean = true,
) =>
  isLicense
    ? userAttributesInputs(mode, 'customer.').slice(1, 11)
    : userAttributesInputs(mode, 'customer.').slice(1, 9);
export const getUserAddressInputsForOrderRequest = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
) => userAttributesInputs(mode, 'customer.').slice(11, 17);

const paymentCommonProps = { gridSize: { xs: 12, sm: 3 }, disabled: false, type: 'number' };
const paymentInputCommonProps = { gridSize: { xs: 12, sm: 9 }, required: true, type: 'number' };
export const contractInputs = (mode: PageActionsEnum = PageActionsEnum.CREATE): InputsProps[] => {
  const isReadOnly = mode === PageActionsEnum.READONLY;
  const isCreate = mode === PageActionsEnum.CREATE;
  return [
    {
      name: 'totalAmount',
      label: 'Saldo Mensual',
      ...paymentInputCommonProps,
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'totalPayments',
      label: 'Mens Pag',
      ...paymentCommonProps,
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'interestRate',
      label: 'Tasa',
      ...paymentInputCommonProps,
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'onTimePayments',
      label: 'Mens Punt',
      ...paymentCommonProps,
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'termMonths',
      label: '# No. Adjud',
      ...paymentInputCommonProps,
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'advancedPayments',
      label: 'Mens Adela',
      ...paymentCommonProps,
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'monthlyPayment',
      label: 'Mensualidad',
      ...paymentInputCommonProps,
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'overduePayments',
      label: 'Mens Venci',
      ...paymentCommonProps,
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'agreementNumber',
      label: 'Convenio',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'agreementType',
      label: 'Tipo de Convenio',
      disabled: isReadOnly,
    },
    {
      name: 'contracts',
      label: 'Contratos',
      type: 'number',
      disabled: isReadOnly,
    },
    {
      name: 'mark',
      label: 'Azul',
      disabled: isReadOnly,
    },

    // New fields from OrderSchema
    {
      name: 'itemName',
      label: 'Nombre del Ítem',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'description',
      label: 'Descripción',
      disabled: isReadOnly,
    },
    {
      name: 'saleDate',
      label: 'Fecha de Venta',
      disabled: isReadOnly,
    },
    {
      name: 'accumulatedAmount',
      label: 'Monto Acumulado',
      type: 'number',
      gridSize: { xs: 12, sm: 6 },
      disabled: isReadOnly,
    },
    {
      name: 'actualContribution',
      label: 'Contribución Actual',
      type: 'number',

      gridSize: { xs: 12, sm: 6 },
      disabled: isReadOnly,
    },
    {
      name: 'amountPaid',
      label: 'Monto Pagado',
      type: 'number',

      gridSize: { xs: 12, sm: 6 },
      disabled: isReadOnly,
    },
    {
      name: 'dailyInterest',
      label: 'Interés Diario',
      type: 'number',

      gridSize: { xs: 12, sm: 6 },
      disabled: isReadOnly,
    },
    {
      name: 'excessAmount',
      label: 'Monto Excedente',
      type: 'number',

      gridSize: { xs: 12, sm: 6 },
      disabled: isReadOnly,
    },
    {
      name: 'downPayment',
      label: 'Pago Inicial',
      ...paymentCommonProps,
      disabled: isReadOnly,
    },
    {
      name: 'secondPayment',
      label: 'Segundo Pago',
      ...paymentCommonProps,
      disabled: isReadOnly,
    },
    {
      name: 'thirdPayment',
      label: 'Tercer Pago',
      ...paymentCommonProps,
      disabled: isReadOnly,
    },
    {
      name: 'fourthPayment',
      label: 'Cuarto Pago',
      ...paymentCommonProps,
      disabled: isReadOnly,
    },
    {
      name: 'fifthPayment',
      label: 'Quinto Pago',
      ...paymentCommonProps,
      disabled: isReadOnly,
    },
    {
      name: 'sixthPayment',
      label: 'Sexto Pago',
      ...paymentCommonProps,
      disabled: isReadOnly,
    },
  ];
};

export const getContractInputsSectionOne = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
  contractInputs(mode).slice(0, 8);
export const getContractInputsSectionTwo = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
  contractInputs(mode).slice(8, 12);
export const getAddInfoInputs1 = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
  contractInputs(mode).slice(12, 20);
export const getAddInfoInputs2 = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
  contractInputs(mode).slice(20);

export enum OrdersTabsEnum {
  Details = 'General',
  Payments = 'Pagos',
}

export const trasformOrderToOrderSchema = (initialOrder?: Order): OrderSchema => {
  if (!initialOrder) return defaultValues;
  return {
    userId: 'd7252b8e-124d-49d2-8fc1-bbf03a051d0f',
    username: 'Admin',
    itemName: 'Toyota Prius 2021',
    itemId: 'Admin',
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
  };
};
