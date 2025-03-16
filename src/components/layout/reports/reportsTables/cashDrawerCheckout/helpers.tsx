import { tableGridStyles, tableGridWithTotalStyles } from './styles';
import CheckOutTotals from './tables/CheckOutTotals';
import TransactionRecap from './tables/TransactionRecap';
import { CashOutCountRowProps, TablesListProps } from './types';
import { ControlledInputType, InputsProps } from '@/components/ui/GridInputs/types';
import { z } from 'zod';

const datePickerStyles = {
  InputLabelProps: {
    sx: {
      marginTop: '32px',
    },
  },
  InputProps: {
    sx: {
      marginTop: '32px',
    },
  },
};

export const salesSchema = z.object({
  invoiceFromDate: z.string().nullable(),
  invoiceToDate: z.string().nullable(),
  salesRep: z.string().nullable(),
});

const items = [
  {
    value: 'Guadalupe',
    label: 'Guadalupe',
  },
  {
    value: 'Angel',
    label: 'Angel',
  },
  {
    value: 'Carlos',
    label: 'Carlos',
  },
  {
    value: 'Cristian',
    label: 'Cristian',
  },
];

export const salesFilters: InputsProps[] = [
  {
    name: 'invoiceFromDate',
    label: 'De',
    required: true,
    inputType: ControlledInputType.datePicker,
    gridSize: { xs: 12, sm: 3, md: 2, lg: 3 },
  },
  {
    name: 'invoiceToDate',
    label: 'Hasta',
    inputType: ControlledInputType.datePicker,
    ...datePickerStyles,
    gridSize: { xs: 12, sm: 3, md: 2, lg: 3 },
  },
  {
    name: 'salesRep',
    label: 'Asesor',
    gridSize: { xs: 12, sm: 3, md: 2, lg: 3 },
    inputType: ControlledInputType.select,
    items,
  },
];

export const cashOutCountProperties = [
  {
    value: 'Cash',
    counted: 'cashCounted',
    calculated: 'cashCalculated',
    overShort: 'cashOverShort',
  },
  {
    value: 'Start Up Amount',
    counted: 'startUpAmountCounted',
    calculated: 'startUpAmountCalculated',
    overShort: 'startUpAmountShort',
  },
  {
    value: 'Paid Out',
    counted: 'paidOutCounted',
    calculated: 'paidOutCalculated',
    overShort: 'paidOutShort',
  },
  {
    value: 'Cash Subtotal',
    counted: 'cashSubtotalCounted',
    calculated: 'cashSubtotalCalculated',
    overShort: 'cashSubtotalShort',
  },
  {
    value: 'Checks',
    counted: 'checksCounted',
    calculated: 'checksCalculated',
    overShort: 'checksShort',
  },
  {
    value: 'Credit Cards',
    counted: 'ccCounted',
    calculated: 'ccCalculated',
    overShort: 'ccShort',
  },
  {
    value: 'Total',
    counted: 'totalCounted',
    calculated: 'totalCalculated',
    overShort: 'totalShort',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCashOutCountRowData = (data: any) => {
  const rows = cashOutCountProperties.map(
    ({ value, counted, overShort, calculated }: CashOutCountRowProps) => ({
      value: value,
      counted: data[counted] ?? '',
      calculated: data[calculated] ?? '',
      overShort: data[overShort] ?? '',
    }),
  );
  return rows;
};

export const defaultValues = {
  cashDrawerNumber: '',
  checkoutDate: new Date(),
};

// export const schema = yup.object().shape({
//   cashDrawerNumber: yup.string().required(),
//   checkoutDate: yup
//     .date()
//     .typeError(errorMessagesYup.validDate)
//     .max(new Date(), errorMessagesYup.futureDisabled)
//     .required(),
// });

export const tables: TablesListProps[] = [
  {
    value: 'cashOutCount',
    TableElement: CheckOutTotals,
    label: 'Ventas',
    md: 6,
    xs: 12,
    sx: tableGridStyles,
  },
  // {
  //   value: 'creditCardDetail',
  //   label: 'Totales',

  //   TableElement: CreditCardDetail,
  //   md: 6,
  //   xs: 12,
  //   sx: tableGridStyles,
  // },
  {
    value: 'transactionRecap',
    TableElement: TransactionRecap,
    md: 12,
    xs: 12,
    sx: tableGridWithTotalStyles,
  },
];
