import { ControlledInputType, InputsProps } from '@/components/ui/GridInputs/types';
import { PageActionsEnum } from '@/types/enums';
import { getOptionsFromEnum, getPersonaSelectOptions } from '@/helpers/utils';
import { User } from '@/types/users';
import { Inventory } from '@/types/inventory';

export enum CustomerStatus {
  ToValidate = 'Por Validar',
  Active = 'Activo',
  Documentation = 'Documentación',
  Delivered = 'Entregado',
  InProgress = 'En progreso',
  Canceled = 'Cancelado',
}
export enum PaymentPlan {
  DownPayment = 'Enganche',
  EightOnTimePayments = '8 Pagos Puntuales',
  AutoPlusThreeEighths = 'Automático Plus ⅜',
  AutoPlusFourSevenths = 'Automático Plus 4/7',
  AutoPlusFiveSixths = 'Automático Plus ⅚',
}
export enum ReviewStatus {
  Accepted = 'Aceptado',
  AcceptedWithIssue = 'Aceptado con incidencia',
  Rejected = 'Rechazado',
}
export enum ProductType {
  Vehicle = 'Auto',
  Motorcycle = 'Moto',
  PIM = 'PIM',
}
export enum CustomerType {
  Individual = 'Persona Física',
  Moral = 'Persona Moral',
}
export enum EmployeeType {
  Seller = 'Vendedor',
  Leader = 'Líder',
  Gerente = 'Gerente',
  Admin = 'Admin',
}
export const termMonthOptions = [
  {
    label: '60 meses',
    value: 60,
    percentage: 0.0273,
  },
  {
    label: '72 meses',
    value: 72,
    percentage: 0.0263,
  },
  {
    label: '84 meses',
    value: 84,
    percentage: 0.0253,
  },
  {
    label: '144 meses',
    value: 144,
    percentage: 0.0253,
  }
];

//NEWERA
const getPageModeFlags = (mode: PageActionsEnum) => {
  return {
    isCreate: mode === PageActionsEnum.CREATE,
    isUpdate: mode === PageActionsEnum.UPDATE,
    isModalView: mode === PageActionsEnum.MODALREADONLY,
    isReadOnly: mode === PageActionsEnum.READONLY || mode === PageActionsEnum.MODALREADONLY,
  };
};
export const baseInputs = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
  parent: string = '',
): InputsProps[] => {
  const { isReadOnly, isCreate } = getPageModeFlags(mode);

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
      label: 'Estatus',
      ...commonInputProps(isCreate, isReadOnly),
      disabled: isCreate || isReadOnly,
      required: false,
      inputType: ControlledInputType.select,
      items: getOptionsFromEnum(CustomerStatus),
    },
  ];
};
export const commonPersonaInputs = (
  // 6 inputs
  mode: PageActionsEnum = PageActionsEnum.CREATE,
  parent: string = '',
): InputsProps[] => {
  const { isReadOnly, isCreate } = getPageModeFlags(mode);

  return [
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
  ];
};
// 4 inputs
export const placeInputs = (mode: PageActionsEnum = PageActionsEnum.CREATE, parent = '') =>
  commonPersonaInputs(mode, parent).filter(
    (input) => !input.name.endsWith('lastName') && !input.name.endsWith('birthdate'),
  );

export const addressInputs = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
  parent: string = '',
): InputsProps[] => {
  // 6 inputs
  const { isReadOnly, isCreate } = getPageModeFlags(mode);
  return [
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

const userFormInputs = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
  parent: string = '',
): InputsProps[] => {
  const { isReadOnly, isCreate } = getPageModeFlags(mode);
  return [
    ...baseInputs(mode, parent), // inputs 0 - 2
    // {
    //   name: `${parent}username`,
    //   label: 'Usuario',
    //   required: isCreate,
    //   disabled: isReadOnly,
    // },
    {
      name: `${parent}employeeType`,
      label: 'Tipo de Empleado',
      ...commonInputProps(isCreate, isReadOnly),
      inputType: ControlledInputType.select,
      items: getOptionsFromEnum(EmployeeType),
    },
    {
      name: `${parent}employeeLeader`,
      label: 'Lider',
      ...commonInputProps(isCreate, isReadOnly),
      inputType: ControlledInputType.select,
      items: [],
    },
    {
      name: `${parent}employeeManager`,
      label: 'Gerente',
      ...commonInputProps(isCreate, isReadOnly),
      inputType: ControlledInputType.select,
      items: [],
    },
    ...commonPersonaInputs(mode, parent), // inputs 6 - 12
    ...addressInputs(mode, parent), // inputs 12 - 18
  ];
};

const customerWorkplaceInputs = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
  parent: string = 'customer.',
): InputsProps[] => {
  // 14 inputs
  const { isReadOnly, isCreate } = getPageModeFlags(mode);
  const inputs = [
    ...placeInputs(mode, parent), // inputs 0 - 4
    {
      name: `${parent}startDate`,
      label: 'Fecha Inicio',
      inputType: ControlledInputType.datePicker,
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}position`,
      label: 'Puesto',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}salary`,
      label: 'Ingresos',
      type: 'number',
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: `${parent}otherIncome`,
      type: 'number',
      label: 'Otros Ingresos',
      disabled: isReadOnly,
    },
    ...addressInputs(mode, parent), // inputs 8 - 14
  ];
  inputs[0].label = 'Nombre o razón social';
  return inputs;
};
const customerBeneficiaryInputs = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
  parent: string = 'customer.',
): InputsProps[] => {
  // 13 inputs
  const { isReadOnly, isCreate } = getPageModeFlags(mode);
  return [
    ...commonPersonaInputs(mode, parent), // inputs 0 - 6
    {
      name: `${parent}relationship`,
      label: 'Parentesco',
      required: isCreate,
      disabled: isReadOnly,
    },
    ...addressInputs(mode, parent), // inputs 6 - 12
  ];
};
const customerFormInputs = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
  parent: string = '',
): InputsProps[] => {
  const { isReadOnly, isCreate } = getPageModeFlags(mode);
  return [
    ...baseInputs(mode, parent), // inputs 0 - 2
    ...commonPersonaInputs(mode, parent), // inputs 2 - 8
    {
      name: `${parent}maritalStatus`,
      label: 'Estado Civil',
      disabled: isReadOnly,
      required: isCreate,
    },
    {
      name: `${parent}taxNumber`,
      label: 'RFC',
      disabled: isReadOnly,
      required: isCreate,
    },
    ...addressInputs(mode, parent), // inputs 10 - 16
    // Customer Workplace
    ...customerWorkplaceInputs(mode, `${parent}workplace.`), // inputs 16 - 24
    // Customer Beneficiary
    ...customerBeneficiaryInputs(mode, `${parent}beneficiary.`), // inputs 24 - 31
  ];
};
//customer inputs
export const getCustomerRequestInputs = (mode: PageActionsEnum, parentName?: string) => {
  const start = mode === PageActionsEnum.UPDATE ? 0 : 2;
  return customerFormInputs(mode, parentName).slice(start, 10);
};
export const getCustomerAddressRequestInputs = (mode: PageActionsEnum, parentName?: string) =>
  customerFormInputs(mode, parentName).slice(10, 16);
export const getCustomerWorkplaceInputs = (mode: PageActionsEnum, parentName?: string) =>
  customerFormInputs(mode, parentName).slice(16, 24);
export const getCustomerWorkplaceAddressInputs = (mode: PageActionsEnum, parentName?: string) =>
  customerFormInputs(mode, parentName).slice(24, 30);
export const getCustomerBeneficiaryInputs = (mode: PageActionsEnum, parentName?: string) =>
  customerFormInputs(mode, parentName).slice(30, 37);
export const getCustomerBeneficiaryAddressInputs = (mode: PageActionsEnum, parentName?: string) =>
  customerFormInputs(mode, parentName).slice(37);

// export const getCustomerWorkplaceInputs = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
//   customerFormInputs(mode).slice(16, 20);
export const getCustomerBeneficiaryRequestInputs = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
) => customerFormInputs(mode).slice(24, 31);

//user inputs
export const getUserRequestInputs = (mode: PageActionsEnum = PageActionsEnum.CREATE) => {
  const start = mode !== PageActionsEnum.CREATE ? 1 : 2;
  return userFormInputs(mode).slice(start, 11);
};
export const getUserAddressRequestInputs = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
  userFormInputs(mode).slice(11);

//customer inputs
export const getUserInputsForCustomerRequest = (mode: PageActionsEnum, parent = '') =>
  userFormInputs(mode, parent)
    .slice(2, 11)
    .filter((input) => input.label !== 'Usuario')
    .map((input) =>
      input.label === 'Número de usuario' ? { ...input, label: 'Número de cliente' } : input,
    );

export const getUserAddressInputsForCustomerRequest = (mode: PageActionsEnum) =>
  userFormInputs(mode).slice(11, 19);

//order inputs
export const getUserInputsForOrderRequest = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
  getUserInputsForCustomerRequest(mode, 'customer.');

export const getUserAddressInputsForOrderRequest = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
) => userFormInputs(mode, 'customer.').slice(11, 19);

const commonInputProps = (isCreate: boolean, isReadOnly: boolean) => ({
  required: isCreate,
  disabled: isReadOnly,
  gridSize: { xs: 12, sm: 6 },
});
const paymentCommonProps = { gridSize: { xs: 12, sm: 6 }, disabled: false, type: 'number' };
const paymentInputCommonProps = { gridSize: { xs: 12, sm: 9 }, required: true, type: 'number' };

export const contractInputs3 = (mode: PageActionsEnum = PageActionsEnum.CREATE): InputsProps[] => {
  const isReadOnly = mode === PageActionsEnum.READONLY || mode === PageActionsEnum.MODALREADONLY;
  const isCreate = mode === PageActionsEnum.CREATE;
  return [
    {
      name: 'totalAmount',
      label: 'Importe',
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
      gridSize: { xs: 12, sm: 6 },
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'agreementType',
      label: 'Tipo de Convenio',
      gridSize: { xs: 12, sm: 6 },
      disabled: isReadOnly,
    },
    {
      name: 'contracts',
      label: 'Contratos',
      type: 'number',
      gridSize: { xs: 12, sm: 6 },
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

export const bussinessFormulas = {
  openingFee: (totalAmount: number) => {
    if (totalAmount < 1000) return;
    const fee = totalAmount > 300000 ? 4000 : 3000;
    const openingFee = totalAmount * 0.03 + fee;
    return (openingFee).toFixed(2);
  },
  monthlyPayment: (totalAmount: number, termMonths: number) => {
    if (totalAmount < 1000) return;
    const percentage = termMonthOptions.find((option) => option.value === termMonths)?.percentage;
    const monthlyPayment = totalAmount * percentage;
    return monthlyPayment.toFixed(2);
  },
  excessAmount: (totalAmount: number, initialPayment: number) => {
    const fee = totalAmount > 300000 ? 4000 : 3000;
    const openingFee = totalAmount * 0.03 + fee;
    return (initialPayment - openingFee).toFixed(2);
  },
  paymentCount: (totalAmount: number, termMonths: number, initialPayment: number) => {
    const fee = totalAmount > 300000 ? 4000 : 3000;
    const openingFee = totalAmount * 0.03 + fee;
    const percentage = termMonthOptions.find((option) => option.value === termMonths)?.percentage;
    const monthlyPayment = totalAmount * percentage;

    if (initialPayment < openingFee) {
      return (initialPayment / openingFee).toFixed(2);
    } else {
      const rest = initialPayment - openingFee;
      const pagosMensualidades = rest / monthlyPayment;
      return (1 + pagosMensualidades).toFixed(2);
    }
  },
}

export const contractInputs = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
  users: User[]
): InputsProps[] => {
  const isReadOnly = mode === PageActionsEnum.READONLY || mode === PageActionsEnum.MODALREADONLY;
  const isCreate = mode === PageActionsEnum.CREATE;
  const readonly = true;
  return [
    {
      name: 'number',
      label: 'Número de Contrato',
      gridSize: { xs: 12, sm: 6 },
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'userId',
      label: 'Vendedor',
      ...commonInputProps(isCreate, isReadOnly),
      required: false,
      inputType: ControlledInputType.select,
      items: getPersonaSelectOptions(users),
    },
    {
      name: 'employeeLeaderId',
      label: 'Lider',
      ...commonInputProps(isCreate, isReadOnly),
      required: false,
      inputType: ControlledInputType.select,
      items: getPersonaSelectOptions(users),
    },
    {
      name: 'employeeManagerId',
      label: 'Gerente',
      ...commonInputProps(isCreate, isReadOnly),
      required: false,
      inputType: ControlledInputType.select,
      items: getPersonaSelectOptions(users),
    },
    {
      name: 'productType',
      label: 'Producto',
      ...commonInputProps(isCreate, isReadOnly),
      required: false,
      inputType: ControlledInputType.select,
      items: getOptionsFromEnum(ProductType),
    },
    {
      name: 'totalAmount',
      label: 'Importe',
      type: 'number',
      ...commonInputProps(isCreate, isReadOnly),
    },
    {
      name: 'termMonths',
      label: 'Plazo',
      ...commonInputProps(isCreate, isReadOnly),
      disabled: isReadOnly,
      required: false,
      inputType: ControlledInputType.select,
      items: termMonthOptions,
    },

    {
      name: 'initialPayment',
      label: 'Pago inicial',
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
      name: 'location',
      label: 'Sucursal',
      ...commonInputProps(!readonly, readonly),
    },
    {
      name: 'saleDate',
      label: 'Fecha de venta',
      inputType: ControlledInputType.datePicker,
      ...commonInputProps(!readonly, readonly),
    },
    {
      name: 'monthlyPayment',
      label: 'Mensualidad',
      type: 'number',
      ...commonInputProps(!readonly, readonly),
    },
    {
      name: 'openingFee',
      label: 'Apertura',
      type: 'number',
      ...commonInputProps(!readonly, readonly),
    },
    {
      name: 'paymentCount',
      label: 'Pagos',
      type: 'number',
      ...commonInputProps(!readonly, readonly),
    },
    {
      name: 'excessAmount',
      label: 'Excedente',
      type: 'number',
      ...commonInputProps(!readonly, readonly),
    },
    {
      name: 'customer.orderCount',
      label: 'No. Contratos',
      type: 'number',
      ...commonInputProps(!readonly, readonly),
    },
  ];
};


// export const getContractInputsSectionOne = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
//   contractInputs(mode).slice(0, 8);
// export const getContractInputsSectionTwo = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
//   contractInputs(mode).slice(8, 11);
// export const getAddInfoInputs1 = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
//   contractInputs(mode).slice(12, 20);
// export const getAddInfoInputs2 = (mode: PageActionsEnum = PageActionsEnum.CREATE) =>
//   contractInputs(mode).slice(20);

export enum OrdersTabsEnum {
  Details = 'General',
  Payments = 'Pagos',
}

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

export const contractInputsNew = (
  mode: PageActionsEnum = PageActionsEnum.CREATE,
): InputsProps[] => {
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
      name: 'termMonths',
      label: 'Plazo',
      ...commonInputProps(isCreate, isReadOnly),
      disabled: isCreate || isReadOnly,
      required: false,
      inputType: ControlledInputType.select,
      items: getOptionsFromEnum(PaymentPlan),
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
      gridSize: { xs: 12, sm: 6 },
      required: isCreate,
      disabled: isReadOnly,
    },
    {
      name: 'agreementType',
      label: 'Tipo de Convenio',
      gridSize: { xs: 12, sm: 6 },
      disabled: isReadOnly,
    },
    {
      name: 'contracts',
      label: 'Contratos',
      type: 'number',
      gridSize: { xs: 12, sm: 6 },
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

