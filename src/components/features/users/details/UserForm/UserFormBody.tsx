'use client';

import { capitalizeFirstLetter } from '@/helpers/utils';
import { User } from '@/types/users';

import { Box, Grid2, Typography } from '@mui/material';
import GridInputs from '@/components/ui/GridInputs/GridInputs';
import { PageModeEnum } from '@/types/enums';
import {
  getUserAddressInputsForOrderRequest,
  getUserInputsForOrderRequest,
} from '@/components/features/orders/helpers';

type UserFormBodyProps = {
  title?: string;
  initialUser?: User | null;
  mode: PageModeEnum;
};

export default function UserFormBody({ title, initialUser, mode }: UserFormBodyProps) {
  {
    /* Grid Section */
  }
  return (
    <Box sx={{ flex: '1 0 auto' }}>
      {title && (
        <Typography variant='h2' sx={{ mb: 5 }}>
          {title || initialUser?.number || capitalizeFirstLetter(PageModeEnum.CREATE)}
        </Typography>
      )}
      <Typography variant='h4' sx={{ pb: '24px' }}>
        Registro
      </Typography>
      <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={getUserInputsForOrderRequest(mode, '', false)} />
        </Grid2>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={getUserAddressInputsForOrderRequest(mode, '')} />
        </Grid2>
      </Grid2>
    </Box>
  );
}
