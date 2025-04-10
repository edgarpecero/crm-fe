'use client';

import GridInputs from '@/components/ui/GridInputs/GridInputs';
import { InputsProps } from '@/components/ui/GridInputs/types';
import { Grid2, Typography } from '@mui/material';

interface TwoColumnsGridProps {
  firstColInputs: InputsProps[];
  secondColInputs: InputsProps[];
  title1?: string;
  title2?: string;
}
function hasTitles(props: TwoColumnsGridProps): boolean {
  return props.title1 !== undefined || props.title2 !== undefined;
}
function TwoColumnsGrid(props: TwoColumnsGridProps) {
  const { firstColInputs, secondColInputs, title1, title2 } = props;
  const isTitles = hasTitles(props);
  return (
    <Grid2 container spacing={6} columns={12}>
      {/* Col One */}
      <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }} alignContent='flex-start'>
        {isTitles && (
          <Grid2 container spacing={3}>
            <Typography variant='h4' sx={{ p: '1rem 0', textAlign: 'center', minHeight: '3.3rem' }}>
              {title1?.toLocaleUpperCase() || ''}
            </Typography>
          </Grid2>
        )}
        <Grid2 container spacing={3}>
          <GridInputs inputs={firstColInputs} />
        </Grid2>
      </Grid2>

      {/* Col Two */}
      <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }} alignContent='flex-start'>
        {isTitles && (
          <Grid2 container spacing={3}>
            <Typography variant='h4' sx={{ p: '1rem 0', textAlign: 'center', minHeight: '3.3rem' }}>
              {title2?.toLocaleUpperCase() || ''}
            </Typography>
          </Grid2>
        )}
        <Grid2 container spacing={3} alignItems='start'>
          <GridInputs inputs={secondColInputs} />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default TwoColumnsGrid;
