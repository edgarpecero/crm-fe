// 'use client';

// import { Order, OrderRequest } from '@/types/orders';
// import { useCallback, useMemo } from 'react';
// import { updateOrderAction } from '@/services/actions/orderActions';
// import { PageActionsEnum } from '@/types/enums';
// import { orderService } from '@/services/orderService';
// import FormLayout, { FormProps } from '@/components/layout/FormLayout/FormLayout';
// import { orderSchema } from '@/helpers/schemas';
// import { getAddInfoInputs1, getAddInfoInputs2 } from '../helpers';
// import { getTabContentStyle } from '@/components/layout/InnerPageTabs/helpers';
// import { useInnerPageTabs } from '@/components/layout/InnerPageTabs/NestedTabsProvider';
// import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
// import { OrdersTabsEnum } from '../helpers';
// import TitlePage from '@/components/layout/PageLayout/TitlePage';
// import TwoColumnsGrid from '@/components/layout/GridLayouts/TwoColumnsGrid';
// export type OrderPaymentsProps = {
//   initialData?: Order;
//   id: string;
//   mode: PageActionsEnum;
// };
// export default function OrderPayments({ initialData, mode, id }: OrderPaymentsProps) {
//   const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.ordersTab);

//   const wrapperStyles = useMemo(
//     () => getTabContentStyle(innerPageTab === OrdersTabsEnum.Payments),
//     [innerPageTab],
//   );
//   const updateOrder = useCallback(
//     //eslint-disable-next-line
//     async (id: string, data: any) => {
//       // logic to format data before sending
//       data.customerId = initialData.customerId;
//       return await updateOrderAction(id, data);
//     },
//     [initialData],
//   );
//   const title =
//     mode === PageActionsEnum.CREATE
//       ? 'Crea un nuevo contrato'
//       : `Detalles del contrato número: ${initialData?.number || ''}`;

//   const formProps: FormProps<Order, OrderRequest> = {
//     schema: orderSchema,
//     service: orderService,
//     // mapToRequest: (data?: Order) => data as any,
//     updateRequestAction: updateOrder,
//     id,
//     initialData,
//     title,
//   };

//   return (
//     <div style={{ ...wrapperStyles, margin: '0 auto' }}>
//       <FormLayout mode={PageActionsEnum.UPDATE} formProps={formProps}>
//         {/* Grid Section */}
//         <TitlePage title={'Información Adicional'} />

//         <TwoColumnsGrid
//           title1='Detalles'
//           title2='Pagos'
//           firstColInputs={getAddInfoInputs1(mode)}
//           secondColInputs={getAddInfoInputs2(mode)}
//         />
//       </FormLayout>
//     </div>
//   );
// }
