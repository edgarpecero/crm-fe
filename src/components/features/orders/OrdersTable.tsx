'use client';

import IconCell from '@/components/ui/DataGridCellComponents/IconCell';
import { dateFormatter, formatToPrice } from '@/helpers/utils';
import { QueryKeysEnum } from '@/services/config';
import { theme } from '@/styles/Theme';
import { ListOrdersResponse, Order } from '@/types/orders';
import { GridColDef } from '@mui/x-data-grid';
import ChipCell from '@/components/ui/DataGridCellComponents/ChipCell';
import { orderService } from '@/services/orderService';
import DataGridLayout from '@/components/layout/DataGridLayout/DataGridLayout';
import { useDataGrid } from '@/hooks/useDataGrid';

export default function OrdersTable({ initialData }: { initialData: ListOrdersResponse }) {
  const gridMethods = useDataGrid<ListOrdersResponse>({
    queryKey: QueryKeysEnum.ORDERS,
    fetchFn: () => orderService.getAll(),
    initialData,
  });
  const { data, ...rest } = gridMethods;

  const pageProps = { ...rest };
  const dataGridHeaderProps = {
    buttonProps: { text: 'Crear nuevo contrato', href: 'cobranza/crear' },
    handleSearch: () => { },
  };
  const dataGridProps = {
    columns: columns,
    rowData: data?.orders,
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
  };

  return (
    <DataGridLayout<Order>
      pageProps={pageProps}
      dataGridProps={dataGridProps}
      dataGridHeaderProps={dataGridHeaderProps}
    />
  )
}

const columns: GridColDef<Order>[] = [
  {
    field: 'number',
    headerName: 'Folio',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 100,
    renderCell: (props) => <ChipCell {...props} />,
  },
  { field: 'userName', headerName: 'Vendedor', flex: 1 },
  {
    field: 'itemName',
    headerName: 'Producto',
    width: 120,
    align: 'center',
    renderCell: (props) => <IconCell {...props} />,
  },
  { field: 'description', headerName: 'Descripción', flex: 1 },
  {
    field: 'totalAmount',
    headerName: 'Monto',
    width: 120,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'actualContribution',
    headerName: 'AP Real',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'downPayment',
    headerName: 'Enganche',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'excessAmount',
    headerName: 'Excedente',
    width: 120,
    valueFormatter: (value) => formatToPrice(value),
    renderCell: (params) => (
      <span style={{ color: theme.palette.success.main }}>{params.value}</span>
    ),
  },
  {
    field: 'monthlyPayment',
    headerName: 'Mensual',
    width: 120,
    valueFormatter: (value) => formatToPrice(value),
  },
  { field: 'termMonths', headerName: 'Plazo', width: 100 },
  {
    field: 'saleDate',
    headerName: 'Fecha de Vta',
    flex: 1,
    valueFormatter: (value) => dateFormatter(value),
  },
  { field: 'customerName', headerName: 'Cliente', flex: 1 },
  { field: 'phone', headerName: 'Teléfono 1', flex: 1 },
  { field: 'phoneSecondary', headerName: 'Teléfono 2', flex: 1 },
  { field: 'totalPayments', headerName: 'Pagos', flex: 1, type: 'number' },
  {
    field: 'onTimePayment',
    headerName: 'Pago Puntual',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'advancedPayments',
    headerName: 'Pagos Adelantados',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'secondPayment',
    headerName: '2DA',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'dailyInterest',
    headerName: 'INT Diario',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
    renderCell: (params) => <span style={{ color: theme.palette.error.main }}>{params.value}</span>,
  },
  {
    field: 'accumulatedAmount',
    headerName: 'Acumulado',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'amountPaid',
    headerName: 'Pagado',
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
];
