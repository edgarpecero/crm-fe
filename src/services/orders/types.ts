interface Order {
  id: string;                       // Unique identifier
  status: string;                   // Status of the order
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
  secondPayment: number;            // 2DA
  dailyInterest: number;            // INT DIARIO
  accumulatedAmount: number;        // ACUMULADO
  amountPaid: number;               // PAGADO
  thirdPayment: number;             // 3RA
  fourthPayment: number;            // 4TA
  fifthPayment: number;             // 5TA
  sixthPayment: number;             // 6TA
  createdAt: string;                // Timestamp of creation (ISO 8601 string)
  lastModifiedAt: string;           // Timestamp of last modification (ISO 8601 string)
  lastModifiedBy: string;           // Who last modified the order
}
