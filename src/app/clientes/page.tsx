import CustomerTable from '@/components/features/customer/CustomerTable';
import Content from '@/components/layout/PageLayout/Content';
import { CustomerProvider } from '@/context/BillingContext/CustomerContext';
import { Typography } from '@mui/material';

const CustomerPage = () => {
  return (
    <CustomerProvider>
      <Content>
        <Typography variant='h2' sx={{ mb: 2 }}>
          Clientes
        </Typography>
        <CustomerTable />
      </Content>
    </CustomerProvider>
  );
};

export default CustomerPage;
