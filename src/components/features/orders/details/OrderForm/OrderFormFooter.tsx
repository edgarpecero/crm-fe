'use client';

import { useFormContext } from 'react-hook-form';
import { Box, Button } from '@mui/material';

type OrderFormProps = {
  isCreate?: boolean;
  isModalView?: boolean;
};

export default function OrderFormFooter({
  isCreate,
  isModalView,
}: OrderFormProps) {
  const { reset, formState: { isDirty }, getValues } = useFormContext();

  return (
    <>
      {!isModalView && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, mt: 5, flexShrink: 0 }}>
          <Button variant='outlined' size='large' onClick={() => reset()} disabled={!isDirty}>
            Cancelar
          </Button>
          <Button
            onClick={() => console.log('data', getValues())}
            variant='contained'
            size='large'
            type='submit'
          >
            {isCreate ? 'Crear' : 'Actualizar'}
          </Button>
        </Box>
      )}
    </>
  );
}
