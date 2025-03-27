// import CustomerTable from '@/components/features/customer/CustomerTable';
import Content from '@/components/layout/PageLayout/Content';
import { Typography } from '@mui/material';

const CustomerPage = () => {
  return (
    <Content>
      <Typography variant='h2' sx={{ mb: 2 }}>
        Clientes
      </Typography>
      {/* <CustomerTable /> */}
    </Content>
  );
};

export default CustomerPage;
