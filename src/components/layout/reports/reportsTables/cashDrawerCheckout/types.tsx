import React from 'react';

export interface TransactionRecapRowProps {
  value: string;
  sales: number;
  paidOut: number;
  balance: number;
}
export interface CreditCardDetailRowProps {
  creditCard: string;
  amount: string;
}
export interface CashOutCountRowProps {
  value: string;
  counted: string;
  calculated: string;
  overShort: string;
}
export interface DrawerDetailTransactionsRowProps {
  transactionType: string;
  invoiceNumber: string;
  tenderType: string;
  tenderNumber: string;
  amount: string;
}
export interface CashDrawerCheckoutTableRow {
  transactionRecap?: TransactionRecapRowProps[];
  creditCardDetail?: CreditCardDetailRowProps[];
  cashOutCount?: CashOutCountRowProps[];
  drawerDetailTransactions?: DrawerDetailTransactionsRowProps[];
}

// export interface CashDrawerSummary {
//   checkout: string;
//   cleared: string;
//   id: string;
//   number: string;
//   startup: string;
//   status: CashDrawerStatusEnum;
// }

export interface TableElementProps {
  rowData:
    | TransactionRecapRowProps[]
    | CreditCardDetailRowProps[]
    | CashOutCountRowProps[]
    | DrawerDetailTransactionsRowProps[];
}
export interface TablesListProps {
  label?: string;
  value: keyof CashDrawerCheckoutTableRow;
  TableElement: React.ComponentType<TableElementProps>;
  md: number;
  xs: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sx?: Record<string, any>;
}
