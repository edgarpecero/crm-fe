export interface Customer {
  id: string;
  customerNumber: string;
  name: string;
  lastName: string;
  email: string;
  phonePrimary: string;
  phoneSecondary?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  birthdate: string; // ISO format (YYYY-MM-DD)
  nationalId: string;
  licenseNumber: string;
  licenseExpiration: string; // ISO format (YYYY-MM-DD)
  registrationDate: string; // ISO format (YYYY-MM-DD)

  purchaseHistory: Purchase[];
  paymentHistory: Payment[];
  financialSummary: FinancialSummary;
  documents: Documents;
  notes: string;
}

export interface Purchase {
  folio: string;
  carDescription: string;
  saleDate: string; // ISO format (YYYY-MM-DD)
  purchaseType: 'Financing' | 'Cash';
  totalPrice: number;
  downPayment: number;
  loanAmount: number;
  monthlyPayment: number;
  termMonths: number;
  remainingBalance: number;
  status: 'Active' | 'Completed' | 'Cancelled';
}

export interface Payment {
  paymentNumber: number;
  folio: string;
  scheduledPaymentDate: string; // ISO format (YYYY-MM-DD)
  realPaymentDate: string; // ISO format (YYYY-MM-DD)
  amountPaid: number;
  capitalPaid: number;
  interestPaid: number;
  interestGenerated: number;
  status: 'On Time' | 'Late' | 'Missed';
  daysLate: number;
}

export interface FinancialSummary {
  totalLoanAmount: number;
  totalAmountDue: number;
  nextPaymentDueDate: string; // ISO format (YYYY-MM-DD)
  nextPaymentAmount: number;
  lastPaymentDate: string; // ISO format (YYYY-MM-DD)
  lastPaymentAmount: number;
  totalLatePayments: number;
  totalAdvancedPayments: number;
  totalInterestPaid: number;
}

export interface Documents {
  contractSigned: boolean;
  insuranceValid: boolean;
  licenseValid: boolean;
  identificationVerified: boolean;
}
