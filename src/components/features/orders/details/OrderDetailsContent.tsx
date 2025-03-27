'use client';

import { CreateOrderRequest, Order, OrderRequest } from '@/types/orders';
import {
  defaultValues,
  orderSchema,
} from '../helpers';
import { useEffect, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import InnerPageTabs from '@/components/layout/InnerPageTabs/InnerPageTabs';
import { enumToTabsArray } from '@/components/layout/InnerPageTabs/helpers';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
import { createOrderAction, updateOrderAction } from '@/services/actions/orderActions';
import { PageModeEnum } from '@/types/enums';
import OrderFormFooter from './OrderForm/OrderFormFooter';
import OrderFormBody from './OrderForm/OrderFormBody';
import { useRouter } from 'next/navigation';
export enum OrdersTabsEnum {
  Details = 'General',
  Payments = 'Pagos',
}

type OrderDetailsContentProps = {
  initialOrder?: Order;
  mode: PageModeEnum;
};
export default function OrderDetailsContent({ initialOrder, mode }: OrderDetailsContentProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const methods = useForm<OrderRequest>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialOrder,
  });

  useEffect(() => {
    if (initialOrder) {
      methods.reset(initialOrder);
    }
  }, [initialOrder, methods]);

  // Título dinámico
  const title = mode === PageModeEnum.CREATE
    ? 'Crea un nuevo contrato'
    : `Detalles de la Orden ${initialOrder?.number}`;

  const handleSubmitOrder = async (data: OrderRequest) => {

    startTransition(async () => {
      if (mode === PageModeEnum.UPDATE && initialOrder?.id) {
        // Edit mode: Call updateOrderAction
        const result = await updateOrderAction(initialOrder.id, data);
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
    <>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <InnerPageTabs tabsArray={enumToTabsArray(OrdersTabsEnum)} id={TabsIdentifierEnum.ordersTab}>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmitOrder)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              // ...(initialOrder ? {} : wrapperStyles),
            }}
          >
            {/* Grid Section */}
            <OrderFormBody mode={mode} />

            {/* Button Section */}
            <OrderFormFooter mode={mode} modalView={false} isPending={isPending} />
          </form>
        </FormProvider>
      </InnerPageTabs>
    </>
  );
}
