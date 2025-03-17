import { BaseEntity } from "../BaseEntity";

export interface Order extends BaseEntity {
  orderNumber: string;              // Folio
  userId: string;                   // Vendedor
  userNumber: string;               // Vendedor
  productId: string;                // Producto
  productNumber: string;            // Producto
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
  phone: string;                    // Telefono 1
  phoneSecondary: string;           // Telefono 2
  totalPayments: number;            // PAGOS
  onTimePayment: number;            // PAGO PUNTUAL
  advancedPayments: number;         // PAGOS ADELANTADOS
  dailyInterest: number;            // INT DIARIO
  accumulatedAmount: number;        // ACUMULADO
  amountPaid: number;               // PAGADO
  secondPayment: number;            // 2DA
  thirdPayment: number;             // 3RA
  fourthPayment: number;            // 4TA
  fifthPayment: number;             // 5TA
  sixthPayment: number;             // 6TA
}

export interface ListOrdersResponse {
  orders: Order[];
  count: number;
}