'use client';

import { capitalizeFirstLetter, getStaleTime } from '@/helpers/utils';
import { CreateOrderRequest, Order, UpdateOrderRequest } from '@/types/orders';
import { useRouter } from 'next/navigation';
import {
  createOrderSchema,
  defaultValues,
  updateOrderSchema,
  getUserInputsForOrderRequest,
  contractInputsSectionOne,
  contractInputsSectionTwo,
  getUserAddressInputsForOrderRequest,
} from '../helpers';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Grid2, Typography } from '@mui/material';
import GridInputs from '@/components/ui/GridInputs/GridInputs';
import { useQuery } from '@tanstack/react-query';
import { FormModeEnum } from '@/components/layout/FormData/helpers';
import { QueryKeysEnum } from '@/services/config';
import OrderForm from './OrderForm/OrderForm';
import InnerPageTabs from '@/components/layout/InnerPageTabs/InnerPageTabs';
import { enumToTabsArray } from '@/components/layout/InnerPageTabs/helpers';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
import { OrderPayments } from './OrderPayments';
import { createOrderAction, updateOrderAction } from '@/services/actions/orderActions';
import { orderService } from '@/services/orderService';

type OrderDetailsContentProps = {
  initialOrder?: Order;
  mode: FormModeEnum;
};

export enum OrdersTabsEnum {
  Details = 'General',
  Payments = 'Pagos',
}

export default function OrderDetailsContent({ initialOrder, mode }: OrderDetailsContentProps) {
  const router = useRouter();
  const id = initialOrder?.id;
  const isCreate = mode === FormModeEnum.CREATE;
  const isUpdate = mode === FormModeEnum.UPDATE;
  const isRead = mode === FormModeEnum.READ;

  // Schema dinámico según el modo
  const schema = isCreate ? createOrderSchema : updateOrderSchema;

  // Configuración de React Hook Form
  const methods = useForm<CreateOrderRequest | UpdateOrderRequest>({
    resolver: zodResolver(schema),
    defaultValues: initialOrder || defaultValues,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = methods;

  const {
    data: order,
    isLoading,
    error,
  } = useQuery<Order>({
    queryKey: [QueryKeysEnum.ORDERS, id],
    queryFn: () => orderService.getById(id!),
    // queryFn: () => getOrderById(id!),
    initialData: initialOrder || undefined,
    staleTime: getStaleTime(),
    enabled: !!id && (isRead || isUpdate), // Solo fetch si hay ID y es READ o UPDATE
  });

  // Sincronizar datos iniciales
  useEffect(() => {
    if (order) {
      reset(order || initialOrder);
    }
  }, [initialOrder, order, reset]);

  // Manejo del envío del formulario
  const onSubmit = async (data: any) => {
    console.log(data);
    if (data.customer.birthdate) {
      const date = new Date(data.customer.birthdate);
      data.customer.birthdate = date.toISOString();
    }
    if (data.customer.licenseExpiration) {
      const date = new Date(data.customer.licenseExpiration);
      data.customer.licenseExpiration = date.toISOString();
    }
    if (!isCreate && initialOrder) {
      await updateOrderAction(id || '', data as Order);
      router.push('/cobranza');
    } else if (isCreate) {
      await createOrderAction(data as Order);
      router.push('/cobranza');

      // TODO: Implementar lógica para crear una orden si corresponde
      // await createOrder(data as CreateOrderRequest);
      // router.push('/orders');
    }
  };

  // Título dinámico
  const title = isCreate
    ? 'Crea un nuevo contrato'
    : isUpdate
      ? `Editar Orden ${order?.number || id}`
      : `Detalles de la Orden ${order?.number || id}`;

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <InnerPageTabs tabsArray={enumToTabsArray(OrdersTabsEnum)} id={TabsIdentifierEnum.ordersTab}>
        <FormProvider {...methods}>
          <OrderForm
            title={title}
            initialOrder={initialOrder}
            isCreate={isCreate}
            onSubmit={onSubmit}
          />
          <OrderPayments />
        </FormProvider>
      </InnerPageTabs>
    </>
  );
}
