'use client';

import { capitalizeFirstLetter } from '@/helpers/utils';
import { Order } from '@/types/orders';
import {
  getUserInputsForOrderRequest,
  getUserAddressInputsForOrderRequest,
  getContractInputsSectionOne,
  getContractInputsSectionTwo,
} from '../../helpers';
import { Box, Grid2, Typography } from '@mui/material';
import GridInputs from '@/components/ui/GridInputs/GridInputs';
import { PageModeEnum } from '@/types/enums';

type OrderFormBodyProps = {
  title?: string;
  initialOrder?: Order | null;
  mode: PageModeEnum;
};

export default function OrderFormBody({ title, initialOrder, mode }: OrderFormBodyProps) {
  {
    /* Grid Section */
  }
  return (
    <Box sx={{ flex: '1 0 auto' }}>
      {title && (
        <Typography variant='h2' sx={{ mb: 5 }}>
          {title || initialOrder?.number || capitalizeFirstLetter(PageModeEnum.CREATE)}
        </Typography>
      )}
      <Typography variant='h4' sx={{ pb: '24px' }}>
        Registro
      </Typography>
      <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={getUserInputsForOrderRequest(mode)} />
        </Grid2>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={getUserAddressInputsForOrderRequest(mode)} />
        </Grid2>
      </Grid2>
      <Typography variant='h4' sx={{ pb: '24px', pt: '24px' }}>
        Información adicional
      </Typography>
      <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={getContractInputsSectionOne(mode)} />
        </Grid2>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={getContractInputsSectionTwo(mode)} />
        </Grid2>
      </Grid2>
    </Box>
  );
}
