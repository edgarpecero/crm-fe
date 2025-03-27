'use client';
import { getTabContentStyle } from '@/components/layout/InnerPageTabs/helpers';
import { useInnerPageTabs } from '@/components/layout/InnerPageTabs/NestedTabsProvider';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
import { useMemo } from 'react';
import { OrdersTabsEnum } from './OrderDetailsContent';
import { Box, Grid2, Typography } from '@mui/material';
import GridInputs from '@/components/ui/GridInputs/GridInputs';
import {} from '../helpers';

export function OrderPayments() {
  const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.ordersTab);
  const wrapperStyles = useMemo(
    () => getTabContentStyle(innerPageTab === OrdersTabsEnum.Payments),
    [innerPageTab],
  );
  return (
    <Box sx={wrapperStyles}>
      <Typography variant='h4' sx={{ pb: '24px', pt: '24px' }}>
        Pagos
      </Typography>
      {/* <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={orderGeneralInputs} />
        </Grid2>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={orderFinancialInputs} />
        </Grid2>
      </Grid2>
      <Typography variant='h4' sx={{ pb: '24px', pt: '24px' }}>
        Información adicional
      </Typography>
      <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={orderPaymentCountsInputs} />
        </Grid2>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={orderSpecificPaymentsInputs} />
        </Grid2>
      </Grid2> */}
    </Box>
  );
}
