import OrdersTable from "@/components/features/orders/OrdersTable";
import { getAllOrders } from "@/services/orders";
import { Typography } from "@mui/material";

const OrdersPage = async () => {
  const initialOrders = await getAllOrders();

  return (
    <>
      <Typography variant='h2' sx={{ mb: 2 }}>
        Cobranza
      </Typography>
      <OrdersTable initialOrders={initialOrders} />
    </>
  );
}
export default OrdersPage;
