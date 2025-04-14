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
  const isCreateMode = mode === PageActionsEnum.CREATE;
  const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.ordersTab);
  const { handleSubmitData } = useSubmitData<Order, CreateOrderRequest, UpdateOrderRequest>({
    id,
    mode,
    // afterCreateRoute: '/cobranza',
    createRequestAction: createOrderAction,
    updateRequestAction: updateOrderAction,
  });
  const wrapperStyles = useMemo(
    () =>
      getTabContentStyle(
        isCreateMode ||
          mode === PageActionsEnum.MODALREADONLY ||
          innerPageTab === OrdersTabsEnum.Details,
      ),
    [innerPageTab, mode, isCreateMode],
  );
  const schema = isCreateMode ? createOrderSchema : updateOrderSchema;
  const title = isCreateMode
    ? 'Datos del pago'
    : `Datos del contrato número: ${initialData?.number || ''}`;

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
      <FormLayout mode={mode} formProps={formProps} footer={!(mode === PageActionsEnum.UPDATE)}>
        {/* Grid Section */}
        <OrderFormBody mode={mode} title={title} />
      </FormLayout>
    </div>
  );
}
