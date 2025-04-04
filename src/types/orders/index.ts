import { BaseEntity } from '../BaseEntity';
import { z } from 'zod';
import { Customer } from '../customers';
import { createOrderSchema, orderSchema, updateOrderSchema } from '@/helpers/schemas';

interface Order extends BaseEntity {
  userId: string; // Vendedor
  userName: string; // Vendedor
  itemId: string; // Producto
  itemName: string; // Producto
  customerId: string; // Cliente
  customerName: string; // Cliente
  customer: Customer;
  description: string; // Descripcion
  totalAmount: number; // Monto
  actualContribution: number; // AP REAL
  downPayment: number; // ENGANCHE
  excessAmount: number; // EXCEDENTE
  monthlyPayment: number; // Mensual
  termMonths: number; // PLAZO
  saleDate: string; // Fecha de Vta (ISO 8601 string)
  totalPayments: number; // PAGOS
  onTimePayments: number; // PAGOS PUNTUAL (corrected from onTimePayment)
  advancedPayments: number; // PAGOS ADELANTADOS
  overduePayments: number; // PAGOS VENCIDOS
  interestRate: number; // Tasa
  agreementNumber: string; // agreementNumber (added)
  agreementType: string; // agreementType (added)
  contracts: number; // contracts (added)
  mark: string; // mark (added)
  secondPayment: number; // 2DA
  dailyInterest: number; // INT DIARIO
  accumulatedAmount: number; // ACUMULADO
  amountPaid: number; // PAGADO
  thirdPayment: number; // 3RA
  fourthPayment: number; // 4TA
  fifthPayment: number; // 5TA
  sixthPayment: number; // 6TA
}
type OrderRequest = z.infer<typeof orderSchema>;
type CreateOrderRequest = z.infer<typeof createOrderSchema>;
type UpdateOrderRequest = z.infer<typeof updateOrderSchema>;
interface ListOrdersResponse {
  orders: Order[];
  count: number;
}

export type { Order, ListOrdersResponse, CreateOrderRequest, UpdateOrderRequest, OrderRequest };
