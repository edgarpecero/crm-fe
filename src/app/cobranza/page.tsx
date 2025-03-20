import OrdersTable from "@/components/features/orders/OrdersTable";
import CircularIndeterminate from "@/components/ui/Progress/CircularIndeterminate";
import { getAllOrders } from "@/services/orders";
import { Suspense } from "react";

export default async function OrdersTablePage() {
  const initialOrders = await getAllOrders();

  return (
    <Suspense fallback={<CircularIndeterminate />} >
      <OrdersTable initialOrders={initialOrders} />
    </Suspense>
  )
}
