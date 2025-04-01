'use client';

import { Order, OrderRequest } from '@/types/orders';
import { useCallback, useMemo } from 'react';
import { updateOrderAction } from '@/services/actions/orderActions';
import { PageActionsEnum } from '@/types/enums';
import { orderService } from '@/services/orderService';
import FormLayout, { FormProps } from '@/components/layout/FormLayout/FormLayout';
import { orderSchema } from '@/helpers/schemas';
import { Box, Grid2, Typography } from '@mui/material';
import GridInputs from '@/components/ui/GridInputs/GridInputs';
import { getAddInfoInputs1, getAddInfoInputs2 } from '../helpers';
import { getTabContentStyle } from '@/components/layout/InnerPageTabs/helpers';
import { useInnerPageTabs } from '@/components/layout/InnerPageTabs/NestedTabsProvider';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
import { OrdersTabsEnum } from '../helpers';
export type OrderPaymentsProps = {
  initialData?: Order;
  id: string;
  mode: PageActionsEnum;
};
export default function OrderPayments({ initialData, mode, id }: OrderPaymentsProps) {
  const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.ordersTab);

  const wrapperStyles = useMemo(
    () => getTabContentStyle(innerPageTab === OrdersTabsEnum.Payments),
    [innerPageTab],
  );
  const updateOrder = useCallback(
    //eslint-disable-next-line
    async (id: string, data: any) => {
      // logic to format data before sending
      console.log('valid');
      data.customerId = initialData.customerId;
      return await updateOrderAction(id, data);
    },
    [initialData],
  );
  console.log('initialData', initialData);
  const title =
    mode === PageActionsEnum.CREATE
      ? 'Crea un nuevo contrato'
      : `Detalles del contrato número: ${initialData?.number || ''}`;

  console.log('asdfasdiid', id);
  const formProps: FormProps<Order, OrderRequest> = {
    schema: orderSchema,
    service: orderService,
    mapToRequest: (data?: Order) => data as OrderRequest,
    updateRequestAction: updateOrder,
    id,
    initialData,
    title,
  };

  return (
    <div style={wrapperStyles}>
      <FormLayout
        mode={PageActionsEnum.UPDATE}
        formProps={formProps}
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
      </FormLayout>
    </div>
  );
}
