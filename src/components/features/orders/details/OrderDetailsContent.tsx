'use client';

import { CreateOrderRequest, Order, UpdateOrderRequest } from '@/types/orders';
import { useMemo } from 'react';
import { createOrderAction, updateOrderAction } from '@/services/actions/orderActions';
import { PageActionsEnum } from '@/types/enums';
import OrderFormBody from './OrderForm/OrderFormBody';
import { orderService as service } from '@/services/orderService';
import FormLayout from '@/components/layout/FormLayout/FormLayout';
import { createOrderSchema, updateOrderSchema } from '@/helpers/schemas';
import { getTabContentStyle } from '@/components/layout/InnerPageTabs/helpers';
import { useInnerPageTabs } from '@/components/layout/InnerPageTabs/NestedTabsProvider';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
import { OrdersTabsEnum } from '../helpers';
import useSubmitData from '@/hooks/useSubmitData';

export type OrderDetailsContentProps = {
  initialData?: Order;
  id?: string;
  mode: PageActionsEnum;
};
export default function OrderDetailsContent({ initialData, mode, id }: OrderDetailsContentProps) {
  const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.ordersTab);
  const { handleSubmitData } = useSubmitData<Order, CreateOrderRequest, UpdateOrderRequest>({
    id,
    mode,
    createRequestAction: createOrderAction,
    updateRequestAction: updateOrderAction,
  });
  const wrapperStyles = useMemo(
    () =>
      getTabContentStyle(
        mode === PageActionsEnum.MODALREADONLY ||
          mode === PageActionsEnum.CREATE ||
          innerPageTab === OrdersTabsEnum.Details,
      ),
    [innerPageTab, mode],
  );
  const isCreateMode = mode === PageActionsEnum.CREATE;
  const schema = isCreateMode ? createOrderSchema : updateOrderSchema;
  const title =
    mode === PageActionsEnum.CREATE
      ? 'Crea un nuevo contrato'
      : `Detalles del contrato número: ${initialData?.number || ''}`;

  const formProps = {
    handleSubmitData,
    initialData,
    id,
    service,
    schema,
    title,
  };

  return (
    <div style={wrapperStyles}>
      <FormLayout mode={mode} formProps={formProps}>
        {/* Grid Section */}
        <OrderFormBody mode={mode} title={title} />
      </FormLayout>
    </div>
  );
}
