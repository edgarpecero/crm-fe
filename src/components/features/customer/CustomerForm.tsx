'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, defaultValuesCustomer } from '@/helpers/formSchemas';
import GridInputs from '@/components/ui/GridInputs/GridInputs';
import { InputsProps } from '@/components/ui/GridInputs/types';
import { Box, Grid2, Typography } from '@mui/material';
import { Customer } from '@/components/features/customer/types';
import { useInnerPageTabs } from '../../layout/InnerPageTabs/NestedTabsProvider';
import { TabsIdentifierEnum } from '../../layout/InnerPageTabs/types';
import { useEffect, useMemo } from 'react';
import { getTabContentStyle } from '../../layout/InnerPageTabs/helpers';
import { CustomerTabsEnum } from './CustomerTabPanel';
import { useCustomer } from '@/context/BillingContext/CustomerContext';
import { useParams } from 'next/navigation';
import { fetchCustomersData } from '@/services/customerServices';
import { add } from 'date-fns';

interface CustomerFormProps {
  onSubmit: (data: Customer) => void;
}

const CustomerForm = ({ onSubmit }: CustomerFormProps) => {
  const { customer } = useCustomer();
  const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.customerTab);
  const urlParams = useParams();

  const wrapperStyles = useMemo(
    () => getTabContentStyle(innerPageTab === CustomerTabsEnum.Details),
    [innerPageTab],
  );

  const methods = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer || defaultValuesCustomer,
    mode: 'all',
  });

  //TODO: REMOVE
  useEffect(() => {
    if (!customer) {
      const customerId = Number(urlParams.id);
      const fetchData = async () => {
        const result = await fetchCustomersData();
        const customer = result.data.find((customer) => customer.id === customerId.toString());
        methods.reset(customer);
      };

      fetchData();
    }
  }, [customer, urlParams, methods]);

  return (
    <Box sx={wrapperStyles}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Typography variant='h4' sx={{ pb: '24px' }}>
            Registro
          </Typography>
          <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
            <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
              <GridInputs inputs={userAttributesInputs} />
            </Grid2>
            <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
              <GridInputs inputs={addressInputs} />
            </Grid2>
          </Grid2>
          <Typography variant='h4' sx={{ pb: '24px', pt: '24px' }}>
            Información adicional
          </Typography>
          <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
            <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
              <GridInputs inputs={contractInputs} />
            </Grid2>
            <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
              <GridInputs inputs={userAditionalAttributesInputs} />
            </Grid2>
          </Grid2>
        </form>
      </FormProvider>
    </Box>
  );
};

const userAttributesInputs: InputsProps[] = [
  { name: 'name', label: 'Nombre', required: true },
  { name: 'lastName', label: 'Apellido', required: true },
  { name: 'email', label: 'Email', required: true },
  { name: 'birthdate', label: 'Fecha de nacimiento', required: true },
  { name: 'phone', label: 'Teléfono principal', required: true },
  { name: 'phoneSecondary', label: 'Teléfono secundario', required: true },
];

const addressInputs: InputsProps[] = [
  { name: 'address', label: 'Dirección', gridSize: { xs: 12, sm: 12 }, required: true },
  { name: 'city', label: 'Ciudad', required: true },
  { name: 'state', label: 'Estado', required: true },
  { name: 'country', label: 'País', required: true },
  { name: 'zip', label: 'Código postal', required: true },
];
const userAdressInputs = addressInputs;

const paymentCommonProps = { gridSize: { xs: 12, sm: 3 }, disabled: false };
const paymentInputCommonProps = { gridSize: { xs: 12, sm: 9 }, required: true };
const contractInputs: InputsProps[] = [
  { name: 'totalAmount', label: 'Saldo Mensual', ...paymentInputCommonProps },
  { name: 'totalPayments', label: 'Mens Pag', ...paymentCommonProps },
  { name: 'interestRate', label: 'Tasa', ...paymentInputCommonProps },
  { name: 'onTimePayment', label: 'Mens Punt', ...paymentCommonProps },
  { name: 'termMonths', label: '# No. Adjud', ...paymentInputCommonProps },
  { name: 'advancedPayments', label: 'Mens Adela', ...paymentCommonProps },
  { name: 'monthlyPayment', label: 'Mensualidad', ...paymentInputCommonProps },
  { name: 'overduePayments', label: 'Mens Venci', ...paymentCommonProps },
];

const userAditionalAttributesInputs: InputsProps[] = [
  { name: 'nationalId', label: 'ID' },
  { name: 'taxNumber', label: 'RFC' },
  { name: 'licenseNumber', label: 'Número de licencia' },
  { name: 'licenseExpiration', label: 'Fecha de expiración de la licencia' },
];

export default CustomerForm;
