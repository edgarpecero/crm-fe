import { Grid2, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import FormButtons from '../common/FormButtons';
import React, { useCallback } from 'react';
import GridInputs from '@/components/ui/GridInputs/GridInputs';
import { salesFilters } from './helpers';
import { useBilling } from '@/context/BillingContext/BillingContext';

const CashDrawerCheckoutForm = () => {
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useFormContext();
  const { handleRefresh } = useBilling();

  // const { cashDrawers } = useGetAllCashDrawer();
  // const { getCashDrawerCheckoutReports, setCashDrawerSummary, setTablesRowData, loading } =
  // useCashDrawerCheckoutReports();
  // const { clearPrintFilters } = usePrintReports();

  const onClear = () => {
    reset();
    // setTablesRowData(undefined);
    // setCashDrawerSummary(undefined);
    // clearPrintFilters(ReportsNodeIndexEnum.cashDrawerCheckout);
  };

  const handleFormSubmit = useCallback(
    () => {
      handleRefresh();
    },
    [handleRefresh],
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Grid2 container spacing={2} pl='30px' pr='30px' alignItems='center'>
        <Grid2 container size={{ xs: 12, sm: 12 }}>
          <Grid2 container size={{ xs: 12, sm: 4, lg: 3 }}>
            <Typography>Fecha de Facturas</Typography>
          </Grid2>
          <Grid2 container size={{ xs: 12, sm: 5, lg: 5 }}>
            <Typography>Assesores</Typography>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} size={{ xs: 12, sm: 6 }}>
          <GridInputs inputs={salesFilters} />
          <Grid2 size={{ xs: 12, sm: 3, md: 2, lg: 3 }} alignItems='center'>
            <FormButtons
              clearDisabled={!isDirty}
              generateDisabled={!isDirty}
              onClear={onClear}
              loading={false}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default React.memo(CashDrawerCheckoutForm);
