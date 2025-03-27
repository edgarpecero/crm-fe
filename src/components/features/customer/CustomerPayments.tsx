// 'use client';
// import { useInnerPageTabs } from '../../layout/InnerPageTabs/NestedTabsProvider';
// import { TabsIdentifierEnum } from '../../layout/InnerPageTabs/types';
// import { useEffect, useMemo, useState } from 'react';
// import { getTabContentStyle } from '../../layout/InnerPageTabs/helpers';
// import { CustomerTabsEnum } from './CustomerTabPanel';
// import { useCustomer } from '@/context/BillingContext/CustomerContext';
// import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
// import { GridColDef } from '@mui/x-data-grid';
// import { Box } from '@mui/material';
// import { fetchCustomerById } from '@/services/customerServices';
// import { formatToPrice } from '@/helpers/utils';
// import DataGridHeader from '@/components/ui/DataGridWrapper/DataGridHeader';
// import { useParams } from 'next/navigation';

// const CustomerPayments = () => {
//   const { customer } = useCustomer();
//   const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.customerTab);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [customerData, setCustomerData] = useState<any>([]);
//   const urlParams = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await fetchCustomerById(customer?.id);
//       setCustomerData(result.data);
//     };

//     fetchData();
//   }, [customer, setCustomerData, urlParams]);

//   const wrapperStyles = useMemo(
//     () => getTabContentStyle(innerPageTab === CustomerTabsEnum.Payments),
//     [innerPageTab],
//   );

//   return (
//     <Box sx={wrapperStyles}>
//       <DataGridHeader buttonProps={{ text: 'Estado de cuenta' }} />
//       <DataGridWrapper columns={columns} rows={customerData} />
//     </Box>
//   );
// };

// const columns: GridColDef[] = [
//   { field: 'folio', headerName: 'Folio', flex: 1 },
//   { field: 'dueDate', headerName: 'Fecha de Vencimiento', flex: 1 },
//   {
//     field: 'scheduledPaymentAmount',
//     headerName: 'Monto Programado',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   { field: 'realPaymentDate', headerName: 'Fecha de Pago Real', flex: 1 },
//   {
//     field: 'amountPaid',
//     headerName: 'Monto Pagado',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   { field: 'interestGenerated', headerName: 'Intereses Generados', flex: 1 },
//   {
//     field: 'capitalPaid',
//     headerName: 'Capital Pagado',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   { field: 'interestPaid', headerName: 'Intereses Pagados', flex: 1 },
//   {
//     field: 'remainingBalance',
//     headerName: 'Saldo Restante',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   { field: 'paymentMethod', headerName: 'Método de Pago', flex: 1 },
//   { field: 'status', headerName: 'Estado', flex: 1 },
//   { field: 'daysLate', headerName: 'Retraso (días)', flex: 1 },
//   {
//     field: 'totalPaidWithInterest',
//     headerName: 'Total Pagado con Intereses',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   { field: 'notes', headerName: 'Notas', flex: 1 },
// ];

// export default CustomerPayments;
