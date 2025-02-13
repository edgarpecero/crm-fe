import BillingTable from '@/components/features/billing/BillingTable';
import Content from '@/components/layout/PageLayout/Content';
import { BillingProvider } from '@/context/BillingContext/BillingContext';
import { Typography } from '@mui/material';

const BillingPage = () => {
  return (
    <BillingProvider>
      <Content>
        <Typography variant='h2' sx={{ mb: 2 }}>
          Cobranza
        </Typography>
        <BillingTable />
      </Content>
    </BillingProvider>
  );
};

export default BillingPage;
