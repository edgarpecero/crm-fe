export enum CustomerStatus {
  PREMIER = 'Premier',
  IN_PROGRESS = 'In Progress',
  DELIVERED = 'Delivered',
  ACTIVE = 'Active',
  CANCELED = 'Canceled',
}

export interface Billing {
  folio: string;
  seller: string;
  status: CustomerStatus;
  product: string;
  description: string;
  amount: number;
  apReal: number;
  downPayment: number;
  surplus: number;
  monthly: number;
  term: number;
  saleDate: string;
  client: string;
  phone1: string;
  phone2: string;
  paymentsMade: number;
  onTimePayment: number;
  advancedPayments: number;
  second: number;
  dailyInterest: number;
  accumulated: number;
  paid: number;
  third: number;
  fourth: number;
  fifth: number;
  sixth: number;
}
