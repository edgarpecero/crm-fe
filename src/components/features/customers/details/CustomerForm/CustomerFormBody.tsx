'use client';

import { capitalizeFirstLetter } from '@/helpers/utils';
import { Customer } from '@/types/customers';

import { Box, Grid2, Typography } from '@mui/material';
import GridInputs from '@/components/ui/GridInputs/GridInputs';
import { PageActionsEnum } from '@/types/enums';
import {
  getUserInputsForOrderRequest,
  getUserAddressInputsForOrderRequest,
} from '@/components/features/orders/helpers';

type CustomerFormBodyProps = {
  title?: string;
  initialCustomer?: Customer | null;
  mode: PageActionsEnum;
};

export default function CustomerFormBody({ title, initialCustomer, mode }: CustomerFormBodyProps) {
  {
    /* Grid Section */
  }
  return (
    <Box sx={{ flex: '1 0 auto' }}>
      {title && mode !== PageActionsEnum.MODALREADONLY && (
        <Typography variant='h2' sx={{ mb: 5 }}>
          {title || initialCustomer?.number || capitalizeFirstLetter(PageActionsEnum.CREATE)}
        </Typography>
      )}
      <Typography variant='h4' sx={{ pb: '24px' }}>
        Registro
      </Typography>
      <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={getUserInputsForOrderRequest(mode, true)} />
        </Grid2>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={getUserAddressInputsForOrderRequest(mode)} />
        </Grid2>
      </Grid2>
    </Box>
  );
}
