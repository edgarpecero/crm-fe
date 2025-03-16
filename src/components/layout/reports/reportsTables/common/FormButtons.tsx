import { useBilling } from '@/context/BillingContext/BillingContext';
import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react';

interface FormButtonsProps {
  clearDisabled: boolean;
  generateDisabled: boolean;
  onClear: () => void;
  loading: boolean;
}

const FormButtons = ({ clearDisabled, generateDisabled, onClear, loading }: FormButtonsProps) => {
  const { handleRefresh } = useBilling();
  return (
    <Box display='flex' gap={2} data-testid='form-buttons' minWidth={'180px'}>
      <Button
        variant={'outlined'}
        color={'inherit'}
        disabled={clearDisabled}
        onClick={onClear}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Cancelar
      </Button>
      <Button
        variant='contained'
        disabled={loading || generateDisabled}
        type='submit'
        onClick={handleRefresh}
        sx={{ width: '100px' }}
      >
        {loading ? <CircularProgress size={20} /> : 'Generar'}
      </Button>
    </Box>
  );
};

export default React.memo(FormButtons);
