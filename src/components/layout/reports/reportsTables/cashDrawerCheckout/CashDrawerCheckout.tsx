'use client';
import { Divider, LinearProgress } from '@mui/material';
import React from 'react';
import TableCard from '../common/TableCard';
import Form from './Form';
import { bigDividerStyle, emptyTableProgressStyle, filledTableProgressStyle } from './styles';
import TablesWrapper from './TablesWrapper';
import { FieldValues, useForm, FormProvider } from 'react-hook-form';
import { defaultValues, salesSchema } from './helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { BillingProvider, useBilling } from '@/context/BillingContext/BillingContext';

const CashDrawerContext = () => {
  // const { tablesRowData, loading } = ();
  const { count, loading } = useBilling();

  return (
    <>
      {count > 0 ? (
        <>
          {loading ? <LinearProgress sx={filledTableProgressStyle} /> : null}
          <Divider />
          <Divider />
          <TablesWrapper />
        </>
      ) : (
        <>
          {loading ? (
            <LinearProgress sx={emptyTableProgressStyle} />
          ) : (
            <Divider sx={bigDividerStyle} />
          )}
        </>
      )}
    </>
  );
};

const CashDrawerCheckout = () => {
  const methods = useForm<FieldValues>({
    mode: 'all',
    defaultValues,
    resolver: zodResolver(salesSchema),
  });
  //TODO: move useInitialLoadFlag hook inside useTab folder

  return (
    <BillingProvider>
      <FormProvider {...methods}>
        <TableCard>
          <Form />
          <CashDrawerContext />
        </TableCard>
      </FormProvider>
    </BillingProvider>
  );
};

export default React.memo(CashDrawerCheckout);
