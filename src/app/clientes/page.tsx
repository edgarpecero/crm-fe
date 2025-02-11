import CustomerTable from '@/components/features/customer/CustomerTable';
import { CustomerProvider } from '@/context/BillingContext/CustomerContext';
import { Typography } from '@mui/material';

const CustomerPage = () => {
  return (
    <CustomerProvider>
      <Typography variant='h2' sx={{ mb: 2 }}>
        Clientes
      </Typography>
      <CustomerTable />
    </CustomerProvider>
  );
};

export default CustomerPage;
