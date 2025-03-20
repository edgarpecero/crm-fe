import { BaseEntity } from "../BaseEntity";

interface Order extends BaseEntity {
  userId: string;                   // Vendedor
  userName: string;               // Vendedor
  itemId: string;                // Producto
  itemName: string;            // Producto
  customerId: string;               // Cliente
  customerName: string;             // Cliente

  description: string;              // Descripcion
  totalAmount: number;              // Monto
  actualContribution: number;       // AP REAL
  downPayment: number;              // ENGANCHE
  excessAmount: number;             // EXCEDENTE
  monthlyPayment: number;           // Mensual
  termMonths: number;               // PLAZO
  saleDate: string;                 // Fecha de Vta (ISO 8601 string)
  totalPayments: number;            // PAGOS
  onTimePayments: number;           // PAGOS PUNTUAL (corrected from onTimePayment)
  advancedPayments: number;         // PAGOS ADELANTADOS
  overduePayments: number;         // PAGOS VENCIDOS
  interestRate: number;            // Tasa
  agreementNumber: string;          // agreementNumber (added)
  agreementType: string;            // agreementType (added)
  contracts: number;                // contracts (added)
  mark: string;                     // mark (added)
  secondPayment: number;            // 2DA
  dailyInterest: number;            // INT DIARIO
  accumulatedAmount: number;        // ACUMULADO
  amountPaid: number;               // PAGADO
  thirdPayment: number;             // 3RA
  fourthPayment: number;            // 4TA
  fifthPayment: number;             // 5TA
  sixthPayment: number;             // 6TA
}

interface ListOrdersResponse {
  orders: Order[];
  count: number;
}

// interface CreateOrderRequest extends Pick<
//   Order,
//   | 'userId'          // Vendedor
//   | 'productId'       // Producto
//   | 'customerId'      // Cliente
//   | 'productNumber'   // Producto
//   | 'customerName'    // Cliente
//   | 'totalAmount'     // Monto
//   | 'actualContribution' // AP REAL
//   | 'downPayment'     // ENGANCHE
//   | 'monthlyPayment'  // Mensual
//   | 'termMonths'      // PLAZO
//   | 'totalPayments'   // PAGOS
// > {
//   userName: string;
// }
// interface UpdateOrderRequest extends Omit<
//   Order,
//   'orderNumber' | 'userNumber'
// > {
//   userName: string; 
// }

export type {
  Order,
  ListOrdersResponse,
};
