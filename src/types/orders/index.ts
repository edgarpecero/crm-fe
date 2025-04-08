import { BaseEntity } from '../BaseEntity';
import { z } from 'zod';
import { createOrderSchema, updateOrderSchema } from '@/helpers/schemas';

interface Order extends BaseEntity {
  userFullname?: string; // Nombre completo del vendedor
  employeeManager?: string; // Nombre del gerente
  productType?: string; // Tipo de producto
  description?: string; // Descripción de la venta
  totalAmount?: number; // Monto total
  initialPayment?: number; // Pago inicial
  openingFee?: number; // Comisión de apertura
  excessAmount?: number; // Monto excedente
  monthlyPayment?: number; // Pago mensual
  termMonths?: number; // Plazo en meses
  saleDate?: string; // Fecha de venta
  customerName?: string; // Nombre del cliente

  paymentCount?: number; // Conteo de pagos
  advancedPayments?: number; // Pagos adelantados
  onTimePayments?: number; // Pagos puntuales
  totalPayments?: number; // Total de pagos
  overduePayments?: number; // Pagos atrasados
  overdueDays?: number; // Días de atraso
  lateFee?: number; // Multa por retraso
  amountPaid?: number; // Monto pagado
  secondPayment?: number; // Segundo pago
  thirdPayment?: number; // Tercer pago
  fourthPayment?: number; // Cuarto pago
  fifthPayment?: number; // Quinto pago
  sixthPayment?: number; // Sexto pago
}

type CreateOrderRequest = z.infer<typeof createOrderSchema>;
type UpdateOrderRequest = z.infer<typeof updateOrderSchema>;
interface ListOrdersResponse {
  orders: Order[];
  count: number;
}

export type { Order, ListOrdersResponse, CreateOrderRequest, UpdateOrderRequest };
