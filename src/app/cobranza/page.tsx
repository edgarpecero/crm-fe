import OrdersTable from '@/components/features/orders/OrdersTable';
import { orderService } from '@/services/orderService';

export default async function OrdersTablePage() {
  const initialData = await orderService.getAll();

  return <OrdersTable initialData={initialData} />;
}
