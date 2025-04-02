'use client';

import { Order, OrderRequest } from '@/types/orders';
import { useCallback, useMemo } from 'react';
import { createOrderAction, updateOrderAction } from '@/services/actions/orderActions';
import { PageActionsEnum } from '@/types/enums';
import OrderFormBody from './OrderForm/OrderFormBody';
import { orderService } from '@/services/orderService';
import FormLayout, { FormProps } from '@/components/layout/FormLayout/FormLayout';
import { orderSchema } from '@/helpers/schemas';
import { getTabContentStyle } from '@/components/layout/InnerPageTabs/helpers';
import { useInnerPageTabs } from '@/components/layout/InnerPageTabs/NestedTabsProvider';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
import { OrdersTabsEnum } from '../helpers';

export type OrderDetailsContentProps = {
  initialData?: Order;
  id?: string;
  mode: PageActionsEnum;
};
export default function OrderDetailsContent({ initialData, mode, id }: OrderDetailsContentProps) {
  const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.ordersTab);

  const wrapperStyles = useMemo(
    () =>
      getTabContentStyle(
        mode === PageActionsEnum.MODALREADONLY ||
          mode === PageActionsEnum.CREATE ||
          innerPageTab === OrdersTabsEnum.Details,
      ),
    [innerPageTab, mode],
  );
  //TODO: FIX HERE
  const createNewOrder = useCallback(
    // eslint-disable-next-line
    async (data: any) => {
      // logic to format data before sending
      data.userName = 'Admin';
      data.itemId = 'Admin';
      data.itemName = 'Toyota Prius 2021';
      data.userId = 'd7252b8e-124d-49d2-8fc1-bbf03a051d0f';
      data.customer.lastModifiedBy = 'Admin'; // Nota: Esto sobrescribe el mismo campo dos veces en el original
      return await createOrderAction(data as OrderRequest);
    },
    [],
  );

  const updateOrder = useCallback(
    //eslint-disable-next-line
    async (id: string, data: any) => {
      // logic to format data before sending
      data.customerId = initialData.customerId;
      return await updateOrderAction(id, data);
    },
    [initialData],
  );

  const title =
    mode === PageActionsEnum.CREATE
      ? 'Crea un nuevo contrato'
      : `Detalles del contrato número: ${initialData?.number || ''}`;

  const formProps: FormProps<Order, OrderRequest> = {
    schema: orderSchema,
    service: orderService,
    mapToRequest: (data?: Order) => data as OrderRequest,
    createRequestAction: createNewOrder,
    updateRequestAction: updateOrder,
    id,
    initialData,
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
