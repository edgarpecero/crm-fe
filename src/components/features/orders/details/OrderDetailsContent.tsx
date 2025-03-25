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
import { createOrderAction } from '@/services/actions/orderActions';
import { PageModeEnum } from '@/types/enums';
import OrderFormFooter from './OrderForm/OrderFormFooter';
import OrderFormBody from './OrderForm/OrderFormBody';

type OrderDetailsContentProps = {
  initialOrder?: Order;
  mode: PageModeEnum;
};

export enum OrdersTabsEnum {
  Details = 'General',
  Payments = 'Pagos',
}

export default function OrderDetailsContent({ initialOrder, mode }: OrderDetailsContentProps) {
  const [isPending, startTransition] = useTransition();
  const methods = useForm<OrderRequest>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialOrder || defaultValues,
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

  const handleCreateOrder = async (data: CreateOrderRequest) => {
    startTransition(async () => {
      const result = await createOrderAction(data);
      if (result.success) {
        alert(result.message);
        methods.reset();
      } else if (result.errors) {
        console.log('Errores de validación:', result.errors);
      } else {
        alert(result.message);
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
            onSubmit={methods.handleSubmit(handleCreateOrder)}
            id={'contractForm'}
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
