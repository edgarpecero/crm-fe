import { ControlledInputType, InputsProps } from '@/components/ui/GridInputs/types';
import { Order } from '@/types/orders';
import { PageActionsEnum } from '@/types/enums';
import { OrderSchema } from '@/helpers/schemas';

export const defaultValues: OrderSchema = {
  userId: 'd7252b8e-124d-49d2-8fc1-bbf03a051d0f',
  userName: 'Admin',
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
    birthdate: new Date('2000-01-01'),
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
    licenseExpiration: new Date('2000-01-01'),
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
  const isReadOnly = mode === PageActionsEnum.READONLY || mode === PageActionsEnum.MODALREADONLY;
  const isCreate = mode === PageActionsEnum.CREATE;

  return [
    {
      name: `${parent}number`,
      label: 'Número de usuario',
      ...commonInputProps(isCreate, isReadOnly),
      disabled: true,
      required: false,
    },
    {
      name: `${parent}status`,
      label: 'Status',
      ...commonInputProps(isCreate, isReadOnly),
      disabled: isCreate || isReadOnly,
      required: false,
    },
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
      inputType: ControlledInputType.datePicker,
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
      label: 'INE',
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
      inputType: ControlledInputType.datePicker,
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
  userAttributesInputs(mode).slice(0, 9);

export const getUserAddressInputs = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
  userAttributesInputs(mode).slice(13, 19);

export const getUserInputsForCustomerRequest = (mode: PageActionsEnum) =>
  userAttributesInputs(mode).slice(0, 11);
export const getUserAddressInputsForCustomerRequest = (mode: PageActionsEnum) =>
  userAttributesInputs(mode).slice(11, 19);

export const getUserInputsForOrderRequest = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
  isLicense: boolean = true,
) =>
  isLicense
    ? userAttributesInputs(mode, 'customer.').slice(0, 11)
    : userAttributesInputs(mode, 'customer.').slice(0, 9);
export const getUserAddressInputsForOrderRequest = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
) => userAttributesInputs(mode, 'customer.').slice(11, 19);

const commonInputProps = (isCreate: boolean, isReadOnly: boolean) => ({
  required: isCreate,
  disabled: isReadOnly,
  gridSize: { xs: 12, sm: 6 },
});
const paymentCommonProps = { gridSize: { xs: 12, sm: 6 }, disabled: false, type: 'number' };
const paymentInputCommonProps = { gridSize: { xs: 12, sm: 9 }, required: true, type: 'number' };

export const contractInputs = (mode: PageActionsEnum = PageActionsEnum.CREATE): InputsProps[] => {
  const isReadOnly = mode === PageActionsEnum.READONLY || mode === PageActionsEnum.MODALREADONLY;
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
      type: 'number',
      gridSize: { xs: 12, sm: 3 },
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
      type: 'number',
      gridSize: { xs: 12, sm: 3 },
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
      type: 'number',
      gridSize: { xs: 12, sm: 3 },
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'monthlyPayment',
      label: 'Mensualidad',
      type: 'number',
      ...paymentInputCommonProps,
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'overduePayments',
      label: 'Mens Venci',
      type: 'number',
      gridSize: { xs: 12, sm: 3 },
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
      name: 'amountPaid',
      label: 'Monto Pagado',
      type: 'number',
      gridSize: { xs: 12, sm: 6 },
      disabled: isReadOnly,
    },
    {
      name: 'description',
      label: 'Descripción',
      disabled: isReadOnly,
      gridSize: { xs: 12, sm: 12 },
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
    userName: 'Admin',
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
      birthdate: new Date(initialOrder.customer.birthdate),
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
      licenseExpiration: new Date(initialOrder.customer.licenseExpiration),
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

export const inventoryInputs = (mode: PageActionsEnum = PageActionsEnum.CREATE): InputsProps[] => {
  const isReadOnly = mode === PageActionsEnum.READONLY || mode === PageActionsEnum.MODALREADONLY;
  const isCreate = mode === PageActionsEnum.CREATE;
  return [
    {
      name: 'sku',
      label: 'Número de serie',
      ...commonInputProps(isCreate, isReadOnly),
      disabled: true,
      required: false,
    },
    {
      name: 'status',
      label: 'Status',
      ...commonInputProps(isCreate, isReadOnly),
      disabled: isCreate || isReadOnly,
    },
    {
      name: 'name',
      label: 'Nombre',
      ...commonInputProps(isCreate, isReadOnly),
    },
    {
      name: 'price',
      label: 'Precio',
      type: 'number',
      ...commonInputProps(isCreate, isReadOnly),
    },
    {
      name: 'description',
      label: 'Descripción',
      ...commonInputProps(isCreate, isReadOnly),
      gridSize: { xs: 12, sm: 12 },
    },
    {
      name: 'quantityStock',
      label: 'Cantidad en stock',
      type: 'number',
      ...commonInputProps(isCreate, isReadOnly),
    },
    {
      name: 'type',
      label: 'Tipo',
      ...commonInputProps(isCreate, isReadOnly),
    },
    {
      name: 'manufacturer',
      label: 'Fabricante',
      ...commonInputProps(isCreate, isReadOnly),
    },
    {
      name: 'model',
      label: 'Modelo',
      ...commonInputProps(isCreate, isReadOnly),
    },
    {
      name: 'year',
      label: 'Año',
      type: 'number',
      ...commonInputProps(isCreate, isReadOnly),
    },
    {
      name: 'vin',
      label: 'VIN',
      ...commonInputProps(isCreate, isReadOnly),
    },
    {
      name: 'fuelType',
      label: 'Tipo de combustible',
      ...commonInputProps(isCreate, isReadOnly),
    },
    {
      name: 'kilometers',
      label: 'Kilometraje',
      type: 'number',
      ...commonInputProps(isCreate, isReadOnly),
    },
    {
      name: 'color',
      label: 'Color',
      ...commonInputProps(isCreate, isReadOnly),
    },
  ];
};

export const getInventoryInputsForInventoryRequestColOne = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
) => inventoryInputs(mode).slice(0, 7);
export const getInventoryInputsForInventoryRequestColTwo = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
) => inventoryInputs(mode).slice(7, 15);
