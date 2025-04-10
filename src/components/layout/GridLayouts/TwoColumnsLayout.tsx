'use client';

import { Grid2, Typography, Grid2Props } from '@mui/material';
import { ReactNode } from 'react';

type TwoColumnsLayoutProps = Grid2Props & {
  contentOne: ReactNode;
  contentTwo: ReactNode;
  title1?: string;
  title2?: string;
};
function hasTitles(props: TwoColumnsLayoutProps): boolean {
  return props.title1 !== undefined || props.title2 !== undefined;
}
function TwoColumnsLayout(props: TwoColumnsLayoutProps) {
  const { contentOne, contentTwo, title1, title2, spacing = 3 } = props;
  const isTitles = hasTitles(props);
  return (
    <Grid2 container spacing={spacing} columns={12}>
      {/* Col One */}
      <Grid2 container spacing={spacing} size={{ xs: 12, sm: 6 }} alignContent='flex-start'>
        {isTitles && (
          <Grid2 container size={12} spacing={spacing} justifyContent={'center'} alignItems='start'>
            <Typography variant='h4' sx={{ p: '1rem 0', textAlign: 'center', minHeight: '3.3rem' }}>
              {title1?.toLocaleUpperCase() || ''}
            </Typography>
          </Grid2>
        )}
        <Grid2 container size={12} spacing={spacing} justifyContent={'center'} alignItems='start'>
          {contentOne}
        </Grid2>
      </Grid2>

      {/* Col Two */}
      <Grid2 container spacing={spacing} size={{ xs: 12, sm: 6 }} alignContent='flex-start'>
        {isTitles && (
          <Grid2 container size={12} spacing={spacing} justifyContent={'center'} alignItems='start'>
            <Typography variant='h4' sx={{ p: '1rem 0', textAlign: 'center', minHeight: '3.3rem' }}>
              {title2?.toLocaleUpperCase() || ''}
            </Typography>
          </Grid2>
        )}
        <Grid2 container size={12} spacing={spacing} justifyContent={'center'} alignItems='start'>
          {contentTwo}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default TwoColumnsLayout;
