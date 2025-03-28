'use client';

import { CreateCustomerRequest, Customer, CustomerRequest } from '@/types/customers';
import { useEffect, useMemo, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { createCustomerAction, updateCustomerAction } from '@/services/actions/customerActions';
import { PageModeEnum } from '@/types/enums';
import { useRouter } from 'next/navigation';
import { customerService } from '@/services/customerService';
import { getTabContentStyle } from '@/components/layout/InnerPageTabs/helpers';
import { customerSchema } from '../../orders/helpers';
import CustomerFormBody from './CustomerForm/CustomerFormBody';
import CustomerFormFooter from './CustomerForm/CustomerFormFooter';

export type CustomerDetailsContentProps = {
  initialData?: Customer;
  mode: PageModeEnum;
  customerId?: string;
};
export default function CustomerDetailsContent({
  initialData,
  mode,
  customerId,
}: CustomerDetailsContentProps) {
  const [isPending, startTransition] = useTransition();
  const readonly = mode === PageModeEnum.READONLY;
  const router = useRouter();
  const methods = useForm<CustomerRequest>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialData,
  });

  const wrapperStyles = useMemo(() => getTabContentStyle(true), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await customerService.getById(initialData?.id);
        methods.reset(resp);
        return resp;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (initialData?.id) {
      fetchData();
    }
  }, [initialData?.id, methods]);

  const title =
    mode === PageModeEnum.CREATE
      ? 'Dar de alta nuevo cliente'
      : `Detalles del cliente ${initialData?.number || customerId || ''}`;

  //TODO: FIX HERE
  //eslint-disable-next-line
  const handleSubmitCustomer = async (data: any) => {
    startTransition(async () => {
      if (mode === PageModeEnum.UPDATE && initialData?.id) {
        // data.customerId = initialData.customerId;
        // Edit mode: Call updateCustomerAction
        const result = await updateCustomerAction(initialData.id, data);
        if (result) {
          alert('Usuario actualizada exitosamente');
          methods.reset(result); // Reset form with updated data
        } else {
          alert('Error al actualizar el usuario');
        }
      } else if (mode === PageModeEnum.CREATE) {
        data.lastModifiedBy = 'Admin';
        data.username = 'Admin';
        // data.customer.lastModifiedBy = 'Admin';
        const result = await createCustomerAction(data as CreateCustomerRequest);

        if (result.success && result.data) {
          alert(result.message);
          methods.reset();
          router.push(`/clientes`);
        } else if (result.errors) {
          console.log('Errores de validación:', result.errors);
        } else {
          alert(result.message);
        }
      }
    });
  };
  return (
    <Box sx={wrapperStyles}>
      {!readonly && (
        <Typography variant='h2' sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmitCustomer)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <div
            style={{
              width: readonly ? '100%' : '80%',
              height: '100%', // Takes full height of the form
              display: 'flex',
              flexDirection: 'column', // Maintains column layout for content
              justifyContent: 'center', // Centers content vertically
              alignItems: 'center', // Centers content horizontally
            }}
          >
            {/* Grid Section */}
            <CustomerFormBody mode={mode} />

            {/* Button Section */}
          </div>
          {!readonly && <CustomerFormFooter mode={mode} modalView={false} isPending={isPending} />}
        </form>
      </FormProvider>
    </Box>
  );
}
