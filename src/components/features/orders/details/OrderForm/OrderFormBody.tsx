'use client';

import { Order } from '@/types/orders';
import {
  getUserInputsForOrderRequest,
  getUserAddressInputsForOrderRequest,
  getContractInputsSectionOne,
  getContractInputsSectionTwo,
} from '../../helpers';
import { Grid2, Typography } from '@mui/material';
import GridInputs from '@/components/ui/GridInputs/GridInputs';
import { PageActionsEnum } from '@/types/enums';
import TitlePage from '@/components/layout/PageLayout/TitlePage';

type OrderFormBodyProps = {
  title?: string;
  initialOrder?: Order | null;
  mode: PageActionsEnum;
};

export default function OrderFormBody({ title, initialOrder, mode }: OrderFormBodyProps) {
  {
    /* Grid Section */
  }
  return (
    <>
      <TitlePage title={title || initialOrder?.number} />

      <Typography variant='h4' sx={{ p: '1.5rem 0' }}>
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

      <Typography variant='h4' sx={{ p: '1.5rem 0' }}>
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
    </>
  );
}
