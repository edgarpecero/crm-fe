'use client';

import { CreateOrderRequest, Order, OrderRequest } from '@/types/orders';
import { orderSchema, OrdersTabsEnum } from '../helpers';
import { useEffect, useMemo, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { createOrderAction, updateOrderAction } from '@/services/actions/orderActions';
import { PageModeEnum } from '@/types/enums';
import OrderFormFooter from './OrderForm/OrderFormFooter';
import OrderFormBody from './OrderForm/OrderFormBody';
import { useRouter } from 'next/navigation';
import { orderService } from '@/services/orderService';
import { getTabContentStyle } from '@/components/layout/InnerPageTabs/helpers';
import { useInnerPageTabs } from '@/components/layout/InnerPageTabs/NestedTabsProvider';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';

export type OrderDetailsContentProps = {
  initialData?: Order;
  mode: PageModeEnum;
  orderId?: string;
};
export default function OrderDetailsContent({
  initialData,
  mode,
  orderId,
}: OrderDetailsContentProps) {
  const [isPending, startTransition] = useTransition();
  const readonly = mode === PageModeEnum.READONLY;
  const router = useRouter();
  const methods = useForm<OrderRequest>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialData,
  });
  const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.ordersTab);

  const wrapperStyles = useMemo(
    () => getTabContentStyle(mode === PageModeEnum.CREATE || innerPageTab === OrdersTabsEnum.Details),
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
      {!readonly && (
        <Typography variant='h2' sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmitOrder)}
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
              boxSizing: 'border-box', // Ensures padding doesn't increase the size
            }}
          >
            {/* Grid Section */}
            <OrderFormBody mode={mode} />

            {/* Button Section */}
          </div>
          {!readonly && <OrderFormFooter mode={mode} modalView={false} isPending={isPending} />}
        </form>
      </FormProvider>
    </Box>
  );
}
