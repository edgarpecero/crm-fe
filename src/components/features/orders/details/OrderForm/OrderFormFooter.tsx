'use client';

import { useFormContext } from 'react-hook-form';
import { Box, Button, CircularProgress } from '@mui/material';
import { PageActionsEnum } from '@/types/enums';

type OrderFormProps = {
  mode: PageActionsEnum;
  modalView?: boolean;
  isPending?: boolean;
};

export default function OrderFormFooter({ mode, modalView, isPending }: OrderFormProps) {
  const {
    reset,
    formState: { isDirty },
  } = useFormContext();

  return (
    <>
      {!modalView && (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            gap: 3,
          }}
        >
          <Button variant='outlined' size='large' onClick={() => reset()} disabled={!isDirty}>
            Cancelar
          </Button>
          <Button
            disabled={isPending}
            variant='contained'
            size='large'
            type='submit'
            sx={{ position: 'relative' }} // Para posicionar el CircularProgress
          >
            {isPending ? (
              <>
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
                <span style={{ visibility: 'hidden' }}>
                  {mode === PageActionsEnum.CREATE ? 'Crear' : 'Actualizar'}
                </span>
              </>
            ) : mode === PageActionsEnum.CREATE ? (
              'Crear'
            ) : (
              'Actualizar'
            )}
          </Button>
        </Box>
      )}
    </>
  );
}
