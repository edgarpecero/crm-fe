'use client';

import React from 'react';
import { dateFormatter, formatToPrice } from '@/helpers/utils';
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
        columnVisibilityModel: {
          apReal: false,
          description: false,
          downPayment: false,
          secondPayment: false,
          thirdPayment: false,
          fourthPayment: false,
          fifthPayment: false,
          sixthPayment: false,
          phone: false,
          phoneSecondary: false,
          totalPayments: false,
          onTimePayment: false,
        },
      },
    },
    actionButtonsProps: {
      modalProps: {
        body: <OrderDetailsContent mode={PageActionsEnum.MODALREADONLY} />,
      },
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
    headerName: 'Estado',
    width: 150,
    renderCell: (props) => <StatusChipCell {...props} />,
  },
  {
    field: 'userName', // Cambiado de 'username' a 'userName'
    headerName: 'Vendedor',
    flex: 1,
  },
  // { field: 'sucursal', headerName: 'Sucursal', flex: 1 }, // No está en la interfaz
  {
    field: 'employeeManager', // Cambiado de 'manager' a 'employeeManager'
    headerName: 'Lider',
    flex: 1,
  },
  {
    field: 'productType', // Cambiado de 'inventoryType' a 'productType'
    headerName: 'Producto',
    width: 100,
    renderCell: (props) => <ProductChipCell {...props} />,
  },
  { field: 'description', headerName: 'Description', flex: 1 }, // Comentado en original
  {
    field: 'totalAmount',
    headerName: 'Monto',
    width: 110,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'initialPayment',
    headerName: 'Pago Inicial',
    width: 110,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'openingFee', // Cambiado de 'openingPayment' a 'openingFee'
    headerName: 'Apertura',
    width: 90,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'excessAmount',
    headerName: 'Excedente',
    width: 90,
    valueFormatter: (value) => formatToPrice(value),
    renderCell: (params) => {
      const color = params.value < 0 ? theme.palette.error.main : theme.palette.success.main;
      return (
        <span style={{ color }}>{params.value}</span>
      )
    },
  },
  {
    field: 'monthlyPayment',
    headerName: 'Mensualidad',
    width: 90,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'termMonths',
    headerName: 'Plazo',
    width: 80,
    renderCell: (params: GridRenderCellParams) => {
      const option = termMonthOptions.find((opt) => opt.value === params?.row?.termMonths);
      return option ? option.label : params?.row?.termMonths.toString();
    },
  },
  {
    field: 'createdAt',
    headerName: 'Fecha de Venta',
    width: 110,
    valueFormatter: (value) => dateFormatter(value),
  },
  {
    field: 'customerName',
    headerName: 'Cliente',
    flex: 1,
  },
  {
    field: 'totalPayments',
    headerName: 'Pagos',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value), // Agregado formatter
  },
  // {
  //   field: 'onTimePayments', // Cambiado de 'onTimePayment' a 'onTimePayments'
  //   headerName: 'Pagos Puntuales',
  //   flex: 1,
  //   valueFormatter: (value) => formatToPrice(value),
  // },
  // {
  //   field: 'advancedPayments',
  //   headerName: 'Pagos Adelantados',
  //   flex: 1,
  //   valueFormatter: (value) => formatToPrice(value),
  // },
  {
    field: 'secondPayment',
    headerName: '2DA',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'thirdPayment',
    headerName: '3RA',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'fourthPayment',
    headerName: '4TA',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'fifthPayment',
    headerName: '5TA',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'sixthPayment',
    headerName: '6TA',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'lastModifiedAt',
    headerName: 'Última Modificación',
    flex: 1,
    valueFormatter: (value) => dateFormatter(value),
  },
];
