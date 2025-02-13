'use client';

import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Billing } from './types';
import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
import { useBilling } from '@/context/BillingContext/BillingContext';
import DataGridHeader from '@/components/ui/DataGridWrapper/DataGridHeader';
import { useMemo, useState } from 'react';
import { dateFormatter, filterData, formatToPrice } from '@/helpers/utils';

const BillingTable = () => {
  const { data } = useBilling();
  const [searchInput, setSearchInput] = useState('');

  const memoizedData = useMemo(
    () => filterData(data, searchInput, 'folio', 'seller', 'product', 'description', 'client'),
    [searchInput, data],
  );

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  const getRowClassName = (params: GridRowParams) => {
    return params.row.status === 'Cancelado' ? 'red-row' : '';
  };

  return (
    <>
      <DataGridHeader handleSearch={handleSearch} />
      <DataGridWrapper
        columns={columns}
        rowData={memoizedData}
        getRowClassName={getRowClassName}
        initialState={{
          columns: {
            columnVisibilityModel: {
              second: false,
              description: false,
              enganche: false,
              third: false,
              fourth: false,
              fifth: false,
              sixth: false,
              phone1: false,
              phone2: false,
              payments: false,
            },
          },
        }}
      />
    </>
  );
};

const columns: GridColDef<Billing>[] = [
  { field: 'folio', headerName: 'Folio', flex: 1 },
  { field: 'seller', headerName: 'Vendedor', flex: 1 },
  { field: 'product', headerName: 'Producto', flex: 1 },
  { field: 'description', headerName: 'Descripción', flex: 1 },
  {
    field: 'amount',
    headerName: 'Monto',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'apReal',
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
    field: 'surplus',
    headerName: 'Excedente',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'monthly',
    headerName: 'Mensual',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  { field: 'term', headerName: 'Plazo', flex: 1, type: 'number' },
  {
    field: 'saleDate',
    headerName: 'Fecha de Vta',
    flex: 1,
    valueFormatter: (value) => dateFormatter(value),
  },
  { field: 'client', headerName: 'Cliente', flex: 1 },
  { field: 'phone1', headerName: 'Teléfono 1', flex: 1 },
  { field: 'phone2', headerName: 'Teléfono 2', flex: 1 },
  { field: 'payments', headerName: 'Pagos', flex: 1, type: 'number' },
  {
    field: 'onTimePayment',
    headerName: 'Pago Puntual',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  { field: 'advancedPayments', headerName: 'Pagos Adelantados', flex: 1, type: 'number' },
  {
    field: 'second',
    headerName: '2DA',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'dailyInterest',
    headerName: 'INT Diario',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'accumulated',
    headerName: 'Acumulado',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'paid',
    headerName: 'Pagado',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'third',
    headerName: '3RA',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'fourth',
    headerName: '4TA',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'fifth',
    headerName: '5TA',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'sixth',
    headerName: '6TA',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
];

export default BillingTable;
