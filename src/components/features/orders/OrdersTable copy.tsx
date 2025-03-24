// 'use client';

// import DataGridPage from '@/components/layout/DataGridPage/DataGridPage';
// import IconCell from '@/components/ui/DataGridCellComponents/IconCell';
// import SimpleActionsCell from '@/components/ui/DataGridCellComponents/SimpleActionsCell';
// import { dateFormatter, filterData, formatToPrice, getStaleTime } from '@/helpers/utils';
// import { QueryKeysEnum } from '@/services/config';
// import { theme } from '@/styles/Theme';
// import { Order } from '@/types/orders';
// import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
// import { useCallback, useMemo, useState } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import ActionModal from '@/components/ui/Modal/ActionModal';
// import { FormProvider, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import ChipCell from '@/components/ui/DataGridCellComponents/ChipCell';
// import { defaultValues, orderSchema } from './helpers';
// import OrderForm from './details/OrderForm/OrderForm';
// import { getAllOrders } from '@/services/orders';
// import { orderService } from '@/services/orderService';

// export default function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
//   const [searchInput, setSearchInput] = useState('');
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [order, setOrder] = useState<Order | null>(null);
//   const router = useRouter();
//   const methods = useForm<any>({
//     resolver: zodResolver(orderSchema),
//     defaultValues: order || defaultValues,
//   });

//   const memoizedData = useMemo(
//     () =>
//       filterData(
//         initialOrders,
//         searchInput,
//         'number',
//         'status',
//         'userName',
//         'itemName',
//         'customerName',
//       ),
//     [searchInput, initialOrders],
//   );

//   const handleSearch = (value: string) => {
//     setSearchInput(value);
//   };

//   const renderActionsCell = useCallback(
//     (params: GridRenderCellParams) => {
//       const rowId = params.row.id;
//       const description = params.row.description;

//       const onDelete = () => {
//         // selectRole({ name: name, description: description, values: [] });
//         // openDeleteModal();
//       };

//       const onEdit = () => {
//         router.push(`/cobranza/${rowId}`);
//       };
//       const onView = async () => {
//         try {
//           const order = {} as Order;
//           // const order = await getOrderById(rowId);
//           if (order) {
//             setOrder(order);
//             setModalOpen(true);
//             methods.reset(order);
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       };

//       return <SimpleActionsCell onDelete={onDelete} onEdit={onEdit} onView={onView} />;
//     },
//     [router, methods],
//   );

//   const aColumns: GridColDef<Order>[] = [
//     ...columns,
//     {
//       field: 'actions',
//       headerName: '',
//       sortable: false,
//       align: 'right',
//       maxWidth: 100,
//       renderCell: renderActionsCell,
//     },
//   ];
//   const dataGridProp = {
//     columns: aColumns,
//     rowData: memoizedData,
//     toolbar: true,
//     initialState: {
//       columns: {
//         columnVisibilityModel: {
//           apReal: false,
//           description: false,
//           downPayment: false,
//           secondPayment: false,
//           thirdPayment: false,
//           fourthPayment: false,
//           fifthPayment: false,
//           sixthPayment: false,
//           phone: false,
//           phoneSecondary: false,
//           totalPayments: false,
//           onTimePayment: false,
//         },
//       },
//     },
//   };

//   const dataGridHeaderProps = {
//     handleSearch: handleSearch,
//     buttonProps: { text: 'Crear nuevo contrato', href: 'cobranza/crear' },
//   };

//   const queryProps = {
//     queryKey: [QueryKeysEnum.ORDERS],
//     queryFn: () => orderService.getAll(),
//     // queryFn: getAllOrders,
//     initialData: [],
//     staleTime: getStaleTime(),
//   };
//   const title = `Detalles de la order ${order?.number}: `;

//   return (
//     <>
//       {/* <ActionModal size='md' open={isModalOpen} onClose={() => setModalOpen(false)} title={title}> */}
//         {/* <OrderForm isModalView={true} initialOrder={order} /> */}

//         {/* <div></div> */}
//         {/* <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
//           <ScanBarCode onScan={handleBarcodeScan} onError={handleBarcodeScanError} />
//         </Box> */}
//       {/* </ActionModal> */}
//       {/* <DataGridPage<Order[]>
//         dataGridHeaderProps={dataGridHeaderProps}
//         dataGridProps={dataGridProp}
//         queryProps={queryProps}
//       /> */}
//     </>
//   );
// }

// const columns: GridColDef<Order>[] = [
//   {
//     field: 'number',
//     headerName: 'Folio',
//     minWidth: 100,
//     flex: 1,
//   },
//   {
//     field: 'status',
//     headerName: 'Status',
//     flex: 1,
//     minWidth: 100,
//     renderCell: (props) => <ChipCell {...props} />,
//   },
//   { field: 'userName', headerName: 'Vendedor', flex: 1 },
//   {
//     field: 'itemName',
//     headerName: 'Producto',
//     width: 120,
//     align: 'center',
//     renderCell: (props) => <IconCell {...props} />,
//   },
//   { field: 'description', headerName: 'Descripción', flex: 1 },
//   {
//     field: 'totalAmount',
//     headerName: 'Monto',
//     width: 120,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   {
//     field: 'actualContribution',
//     headerName: 'AP Real',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   {
//     field: 'downPayment',
//     headerName: 'Enganche',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   {
//     field: 'excessAmount',
//     headerName: 'Excedente',
//     width: 120,
//     valueFormatter: (value) => formatToPrice(value),
//     renderCell: (params) => (
//       <span style={{ color: theme.palette.success.main }}>{params.value}</span>
//     ),
//   },
//   {
//     field: 'monthlyPayment',
//     headerName: 'Mensual',
//     width: 120,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   { field: 'termMonths', headerName: 'Plazo', width: 100 },
//   {
//     field: 'saleDate',
//     headerName: 'Fecha de Vta',
//     flex: 1,
//     valueFormatter: (value) => dateFormatter(value),
//   },
//   { field: 'customerName', headerName: 'Cliente', flex: 1 },
//   { field: 'phone', headerName: 'Teléfono 1', flex: 1 },
//   { field: 'phoneSecondary', headerName: 'Teléfono 2', flex: 1 },
//   { field: 'totalPayments', headerName: 'Pagos', flex: 1, type: 'number' },
//   {
//     field: 'onTimePayment',
//     headerName: 'Pago Puntual',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   {
//     field: 'advancedPayments',
//     headerName: 'Pagos Adelantados',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   {
//     field: 'secondPayment',
//     headerName: '2DA',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   {
//     field: 'dailyInterest',
//     headerName: 'INT Diario',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//     renderCell: (params) => <span style={{ color: theme.palette.error.main }}>{params.value}</span>,
//   },
//   {
//     field: 'accumulatedAmount',
//     headerName: 'Acumulado',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   {
//     field: 'amountPaid',
//     headerName: 'Pagado',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   {
//     field: 'thirdPayment',
//     headerName: '3RA',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   {
//     field: 'fourthPayment',
//     headerName: '4TA',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   {
//     field: 'fifthPayment',
//     headerName: '5TA',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
//   {
//     field: 'sixthPayment',
//     headerName: '6TA',
//     flex: 1,
//     valueFormatter: (value) => formatToPrice(value),
//   },
// ];
