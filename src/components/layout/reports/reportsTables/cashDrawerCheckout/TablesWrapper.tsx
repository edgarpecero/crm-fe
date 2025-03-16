import { Box, Grid, Typography } from '@mui/material';
import { cashDrawerCheckoutTableStyles } from './styles';
import { tables } from './helpers';
import React from 'react';
import { useBilling } from '@/context/BillingContext/BillingContext';

const CashDrawerCheckoutTablesWrapper = () => {
  const { data } = useBilling();
  const tablesRowData = data as any;
  return (
    <Box sx={cashDrawerCheckoutTableStyles}>
      <Grid container rowSpacing={1.5} columnSpacing={3}>
        <Grid item xs={12}>
          <Typography variant='h4'>Transaction Recap</Typography>
        </Grid>
        {tables.map(({ value, TableElement, xs, md, sx }) => (
          <Grid item key={value} xs={xs} md={md} sx={sx}>
            {tablesRowData && <TableElement rowData={tablesRowData[value] || []} />}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(CashDrawerCheckoutTablesWrapper);
