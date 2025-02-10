import BillingTable from '@/components/features/billing/BillingTable';
import { BillingProvider } from '@/context/BillingContext/BillingContext';
import { Typography } from '@mui/material';

const BillingPage = () => {
  return (
    <BillingProvider>
      <Typography variant='h2' sx={{ mb: 2 }}>
        Cobranza
      </Typography>
      <BillingTable />
    </BillingProvider>
  );
};

export default BillingPage;
