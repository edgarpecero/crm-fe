'use client';

import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Billing } from './types';
import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
import { useBilling } from '@/context/BillingContext/BillingContext';
import DataGridHeader from '@/components/ui/DataGridWrapper/DataGridHeader';
import { useMemo, useState } from 'react';
import { dateFormatter, filterData, formatToPrice } from '@/helpers/utils';

const columns: GridColDef<Billing>[] = [
  { field: 'folio', headerName: 'Folio', width: 100 },
  { field: 'seller', headerName: 'Vendedor', width: 100 },
  { field: 'product', headerName: 'Producto', width: 100 },
  { field: 'description', headerName: 'Descripción', width: 100 },
  {
    field: 'amount',
    headerName: 'Monto',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'apReal',
    headerName: 'AP Real',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'downPayment',
    headerName: 'Enganche',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'surplus',
    headerName: 'Excedente',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'monthly',
    headerName: 'Mensual',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  { field: 'term', headerName: 'Plazo', width: 100, type: 'number' },
  {
    field: 'saleDate',
    headerName: 'Fecha de Vta',
    width: 100,
    valueFormatter: (value) => dateFormatter(value),
  },
  { field: 'client', headerName: 'Cliente', width: 100 },
  { field: 'phone1', headerName: 'Teléfono 1', width: 100 },
  { field: 'phone2', headerName: 'Teléfono 2', width: 100 },
  { field: 'payments', headerName: 'Pagos', width: 100, type: 'number' },
  {
    field: 'onTimePayment',
    headerName: 'Pago Puntual',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  { field: 'advancedPayments', headerName: 'Pagos Adelantados', width: 100, type: 'number' },
  {
    field: 'second',
    headerName: '2DA',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'dailyInterest',
    headerName: 'INT Diario',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'accumulated',
    headerName: 'Acumulado',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'paid',
    headerName: 'Pagado',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'third',
    headerName: '3RA',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'fourth',
    headerName: '4TA',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'fifth',
    headerName: '5TA',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'sixth',
    headerName: '6TA',
    width: 100,
    valueFormatter: (value) => formatToPrice(value),
  },
];

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
      <DataGridWrapper columns={columns} rowData={memoizedData} getRowClassName={getRowClassName} />
    </>
  );
};

export default BillingTable;
