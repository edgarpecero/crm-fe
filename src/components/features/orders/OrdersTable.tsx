'use client';

import React from 'react';
import { dateFormatter, formatToPrice, pickRandomColors } from '@/helpers/utils';
import { QueryKeysEnum } from '@/services/config';
import { theme } from '@/styles/Theme';
import { ListOrdersResponse, Order } from '@/types/orders';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { orderService } from '@/services/orderService';
import DataGridLayout from '@/components/layout/DataGridLayout/DataGridLayout';
import { useQueryData } from '@/hooks/useQueryData';
import OrderDetailsContent from './details/OrderDetailsContent';
import { PageActionsEnum } from '@/types/enums';
import StatusChipCell from '@/components/ui/DataGridCellComponents/StatusChipCell';
import { termMonthOptions } from './helpers';
import ProductChipCell from '@/components/ui/DataGridCellComponents/ProductChipCell';
import { colWidth } from '@/helpers/constants';

function OrdersTable({ initialData }: { initialData: ListOrdersResponse }) {
  const gridMethods = useQueryData<ListOrdersResponse>({
    queryKey: QueryKeysEnum.ORDERS,
    fetchFn: () => orderService.getAll(),
    initialData,
  });
  const { data, ..._pageProps } = gridMethods;

  const pageProps = { ..._pageProps };
  const dataGridHeaderProps = {
    // buttonProps: { text: 'Crear nuevo contrato', href: 'cobranza/crear' },
    // handleSearch: () => {},
  };
  const dataGridProps = {
    columns: _columns,
    rows: data?.orders || [],
    toolbar: true,
    initialState: {
      columns: {
        columnVisibilityModel: {},
      },
    },
    actionButtonsProps: {
      modalProps: {
        body: <OrderDetailsContent mode={PageActionsEnum.MODALREADONLY} />,
      },
      // editAction: true,
      // deleteAction: true,
    },
  };

  return (
    <DataGridLayout<Order>
      pageProps={pageProps}
      dataGridProps={dataGridProps}
      dataGridHeaderProps={dataGridHeaderProps}
    />
  );
}

export default React.memo(OrdersTable);

const _columns: GridColDef<Order>[] = [
  {
    field: 'number',
    headerName: 'Folio',
    width: 120,
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: colWidth.status,
    renderCell: (props) => <StatusChipCell {...props} />,
  },
  {
    field: 'createdAt',
    headerName: 'Venta',
    width: colWidth.date,
    valueFormatter: (value) => dateFormatter(value),
  },
  {
    field: 'location', headerName: 'Sucursal', flex: 1, minWidth: colWidth.location,
    renderCell: () => (
      <span >Pachuca</span>
    ),
  }, // No está en la interfaz
  {
    field: 'userName', // Cambiado de 'username' a 'userName'
    headerName: 'Vendedor',
    flex: 1,
    minWidth: colWidth.name,
  },
  {
    field: 'employeeLeader',
    headerName: 'Líder',
    minWidth: colWidth.name,
    flex: 1,
  },
  {
    field: 'employeeManager',
    headerName: 'Gerente',
    minWidth: colWidth.name,
    flex: 1,
  },
  {
    field: 'productType', // Cambiado de 'inventoryType' a 'productType'
    headerName: 'Producto',
    width: 100,
    renderCell: (props) => <ProductChipCell {...props} />,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: colWidth.name,
  }, // Comentado en original
  {
    field: 'totalAmount',
    headerName: 'Monto',
    width: colWidth.money,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'initialPayment',
    headerName: 'Pago Inicial',
    width: colWidth.money,
    renderCell: (params) => (
      <span style={{ color: theme.palette.primary.dark }}>{formatToPrice(params.value)}</span>
    ),
  },
  {
    field: 'openingFee', // Cambiado de 'openingPayment' a 'openingFee'
    headerName: 'Apertura',
    width: colWidth.money,
    renderCell: (params) => (
      <span style={{ color: theme.palette.warning.dark }}>{formatToPrice(params.value)}</span>
    ),
  },
  {
    field: 'excessAmount',
    headerName: 'Excedente',
    width: colWidth.money,
    renderCell: (params) => {
      const color = params.value < 0 ? theme.palette.error.main : theme.palette.success.main;
      return <span style={{ color }}>{formatToPrice(params.value)}</span>;
    },
  },
  {
    field: 'monthlyPayment',
    headerName: 'Mensualidad',
    width: colWidth.money,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'termMonths',
    headerName: 'Plazo',
    width: 70,
    renderCell: (params: GridRenderCellParams) => {
      const option = termMonthOptions.find((opt) => opt.value === params?.row?.termMonths);
      return option ? option.label : params?.row?.termMonths.toString();
    },
  },
  {
    field: 'customerName',
    headerName: 'Cliente',
    flex: 1,
    minWidth: colWidth.name,
  },
  {
    field: 'paymentCount',
    headerName: 'Pagos',
    width: 60,
    align: 'right',
  },
  {
    field: 'onTimePayments', // Cambiado de 'onTimePayment' a 'onTimePayments'
    headerName: 'Pagos Puntuales',
    width: 120,
    align: 'right',
  },
  {
    field: 'advancedPayments',
    headerName: 'Pagos Adelantados',
    minWidth: colWidth.money,
    renderCell: (params) => (
      <span style={{ color: theme.palette.primary.dark }}>{formatToPrice(params.value)}</span>
    ),
  },
  {
    field: 'secondPayment',
    headerName: '2DA',
    minWidth: colWidth.money,
    renderCell: (params: GridRenderCellParams) => (
      <span style={{ color: pickRandomColors() }}>{formatToPrice(params.value)}</span>
    ),
  },
  {
    field: 'dailyInterest',
    headerName: 'Int Diario',
    minWidth: colWidth.money,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'acumulatedInterest',
    headerName: 'Acumulado',
    minWidth: colWidth.money,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'interestPaid',
    headerName: 'Int pagado',
    minWidth: colWidth.money,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'thirdPayment',
    headerName: '3RA',
    minWidth: colWidth.money,
    renderCell: (params: GridRenderCellParams) => (
      <span style={{ color: pickRandomColors() }}>{formatToPrice(params.value)}</span>
    ),
  },
  {
    field: 'fourthPayment',
    headerName: '4TA',
    minWidth: colWidth.money,
    renderCell: (params: GridRenderCellParams) => (
      <span style={{ color: pickRandomColors() }}>{formatToPrice(params.value)}</span>
    ),
  },
  {
    field: 'fifthPayment',
    headerName: '5TA',
    minWidth: colWidth.money,
    renderCell: (params: GridRenderCellParams) => (
      <span style={{ color: pickRandomColors() }}>{formatToPrice(params.value)}</span>
    ),
  },
  {
    field: 'sixthPayment',
    headerName: '6TA',
    minWidth: colWidth.money,
    renderCell: (params: GridRenderCellParams) => (
      <span style={{ color: pickRandomColors() }}>{formatToPrice(params.value)}</span>
    ),
  },
  {
    field: 'lastModifiedAt',
    headerName: 'Modificado',
    width: colWidth.date,
    valueFormatter: (value) => dateFormatter(value),
  },
];
