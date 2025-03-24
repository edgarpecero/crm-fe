'use client';

import { CreateOrderRequest, Order, UpdateOrderRequest } from '@/types/orders';
import {
  orderSchema,
  defaultValues,
} from '../../helpers';
import { FormProvider, useForm } from 'react-hook-form';
import { useInnerPageTabs } from '@/components/layout/InnerPageTabs/NestedTabsProvider';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
import { useMemo } from 'react';
import { OrdersTabsEnum } from '../OrderDetailsContent';
import { getTabContentStyle } from '@/components/layout/InnerPageTabs/helpers';
import OrderFormInputs from './OrderFormBody';
import { zodResolver } from '@hookform/resolvers/zod';
import OrderFormFooter from './OrderFormFooter';

type OrderFormProps = {
  title?: string;
  initialOrder?: Order | null;
  isCreate?: boolean;
  isModalView?: boolean;
  onSubmit?: (data: any) => void;
  readonly?: boolean;
};

export default function OrderForm({
  initialOrder,
  onSubmit,
  isCreate,
  isModalView,
  title,
  readonly,
}: OrderFormProps) {
  const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.ordersTab);
  const wrapperStyles = useMemo(
    () => getTabContentStyle(innerPageTab === OrdersTabsEnum.Details),
    [innerPageTab],
  );

  const methods = useForm<CreateOrderRequest | UpdateOrderRequest>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialOrder || defaultValues,
  });

  const handleSubmit = (data: CreateOrderRequest | UpdateOrderRequest) => {
    if (onSubmit) {
      onSubmit(data);
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        id={'contractForm'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          ...(initialOrder ? {} : wrapperStyles),
        }}
      >
        {/* Grid Section */}
        <OrderFormInputs readonly={readonly} />

        {/* Button Section */}
        <OrderFormFooter isCreate={isCreate} isModalView={isModalView} />
      </form>
    </FormProvider>
  );
}
