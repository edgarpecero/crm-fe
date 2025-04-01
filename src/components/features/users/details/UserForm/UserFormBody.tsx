'use client';

import { User } from '@/types/users';
import { Grid2, Typography } from '@mui/material';
import GridInputs from '@/components/ui/GridInputs/GridInputs';
import { PageActionsEnum } from '@/types/enums';
import { getUserAddressInputs, getUserInputs } from '@/components/features/orders/helpers';
import TitlePage from '@/components/layout/PageLayout/TitlePage';

type UserFormBodyProps = {
  title?: string;
  initialUser?: User | null;
  mode: PageActionsEnum;
};

export default function UserFormBody({ title, mode }: UserFormBodyProps) {
  {
    /* Grid Section */
  }
  return (
    <>
      <TitlePage title={title} />

      <Typography variant='h4' sx={{ pb: '24px' }}>
        Información
      </Typography>
      <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={getUserInputs(mode)} />
        </Grid2>
        <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={getUserAddressInputs(mode)} />
        </Grid2>
      </Grid2>
    </>
  );
}
