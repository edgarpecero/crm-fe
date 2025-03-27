'use client';

import { CreateOrderRequest, Order, OrderRequest, UpdateOrderRequest } from '@/types/orders';
import { orderSchema, defaultValues, OrdersTabsEnum } from '../../helpers';
import { FormProvider, useForm } from 'react-hook-form';
import { useInnerPageTabs } from '@/components/layout/InnerPageTabs/NestedTabsProvider';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
import { useMemo } from 'react';
import { getTabContentStyle } from '@/components/layout/InnerPageTabs/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageModeEnum } from '@/types/enums';

type OrderFormProps = {
  title?: string;
  initialOrder?: Order | null;
  isCreate?: boolean;
  isModalView?: boolean;
  onSubmit: (data: OrderRequest) => void;
  readonly?: boolean;
  mode: PageModeEnum;
};

export default function OrderForm({ initialOrder, onSubmit }: OrderFormProps) {
  const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.ordersTab);
  const wrapperStyles = useMemo(
    () => getTabContentStyle(innerPageTab === OrdersTabsEnum.Details),
    [innerPageTab],
  );

  const methods = useForm<CreateOrderRequest | UpdateOrderRequest>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialOrder || defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        id={'contractForm'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          ...(initialOrder ? {} : wrapperStyles),
        }}
      >
        {/* Grid Section */}

        {/* Button Section */}
      </form>
    </FormProvider>
  );
}
