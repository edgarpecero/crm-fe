'use client';

import { CreateOrderRequest, Order, OrderRequest } from '@/types/orders';
import { getAddInfoInputs1, getAddInfoInputs2, orderSchema, OrdersTabsEnum } from '../helpers';
import { useEffect, useMemo, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Grid2, Typography } from '@mui/material';
import { createOrderAction, updateOrderAction } from '@/services/actions/orderActions';
import { PageModeEnum } from '@/types/enums';
import OrderFormFooter from './OrderForm/OrderFormFooter';
import { useRouter } from 'next/navigation';
import { orderService } from '@/services/orderService';
import GridInputs from '@/components/ui/GridInputs/GridInputs';
import { getTabContentStyle } from '@/components/layout/InnerPageTabs/helpers';
import { useInnerPageTabs } from '@/components/layout/InnerPageTabs/NestedTabsProvider';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
export type OrderDetailsContentProps = {
  initialData?: Order;
  mode: PageModeEnum;
  orderId?: string;
};
export default function OrderPayments({ initialData, mode, orderId }: OrderDetailsContentProps) {
  const [isPending, startTransition] = useTransition();
  const readonly = mode === PageModeEnum.READONLY;
  const router = useRouter();
  const methods = useForm<OrderRequest>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialData,
  });
  const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.ordersTab);

  const wrapperStyles = useMemo(
    () => getTabContentStyle(innerPageTab === OrdersTabsEnum.Payments),
    [innerPageTab],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await orderService.getById(initialData?.id);
        console.log('resp', resp);
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
      ? 'Crea un nuevo contrato'
      : `Detalles de la Orden ${initialData?.number || orderId || ''}`;

  //TODO: FIX HERE
  //eslint-disable-next-line
  const handleSubmitOrder = async (data: any) => {
    data.customerId = initialData.customerId;
    startTransition(async () => {
      if (mode === PageModeEnum.UPDATE && initialData?.id) {
        // Edit mode: Call updateOrderAction
        console.log('Updating order:', data);
        const result = await updateOrderAction(initialData.id, data);
        if (result) {
          alert('Orden actualizada exitosamente');
          methods.reset(result); // Reset form with updated data
        } else {
          alert('Error al actualizar la orden');
        }
      } else if (mode === PageModeEnum.CREATE) {
        // Create mode: Call createOrderAction
        const result = await createOrderAction(data as CreateOrderRequest);
        if (result.success && result.data) {
          alert(result.message);
          methods.reset();
          router.push(`/cobranza/${result.data.id}`);
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
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmitOrder)}
          id={'order-form-payments'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <div
            style={{
              width: '80%',
              height: '100%', // Takes full height of the form
              display: 'flex',
              flexDirection: 'column', // Maintains column layout for content
              justifyContent: 'center', // Centers content vertically
              alignItems: 'center', // Centers content horizontally
              boxSizing: 'border-box', // Ensures padding doesn't increase the size
            }}
          >
            {/* Grid Section */}
            <Box sx={{ flex: '1 0 auto' }}>
              {title && (
                <Typography variant='h2' sx={{ mb: 5 }}>
                  Información Adicional
                </Typography>
              )}
              <Typography variant='h4' sx={{ pb: '24px' }}>
                Detalles
              </Typography>
              <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
                <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
                  <GridInputs inputs={getAddInfoInputs1(mode)} />
                </Grid2>
              </Grid2>
              <Typography variant='h4' sx={{ pb: '24px', pt: '24px' }}>
                Pagos
              </Typography>
              <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
                <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
                  <GridInputs inputs={getAddInfoInputs2(mode)} />
                </Grid2>
              </Grid2>
            </Box>
            {/* <OrderFormBody mode={mode} /> */}

            {/* Button Section */}
          </div>
          {!readonly && <OrderFormFooter mode={mode} modalView={false} isPending={isPending} />}
        </form>
      </FormProvider>
    </Box>
  );
}
