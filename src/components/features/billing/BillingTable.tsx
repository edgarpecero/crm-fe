'use client';

import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Billing } from './types';
import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
import { useBilling } from '@/context/BillingContext/BillingContext';
import DataGridHeader from '@/components/ui/DataGridWrapper/DataGridHeader';
import { useState } from 'react';

const columns: GridColDef<Billing>[] = [
  { field: 'folio', headerName: 'Folio', width: 100 },
  { field: 'seller', headerName: 'Vendedor', width: 100 },
  { field: 'product', headerName: 'Producto', width: 100 },
  { field: 'description', headerName: 'Descripción', width: 100 },
  { field: 'amount', headerName: 'Monto', width: 100, type: 'number' },
  { field: 'apReal', headerName: 'AP Real', width: 100, type: 'number' },
  { field: 'downPayment', headerName: 'Enganche', width: 100, type: 'number' },
  { field: 'surplus', headerName: 'Excedente', width: 100, type: 'number' },
  { field: 'monthly', headerName: 'Mensual', width: 100, type: 'number' },
  { field: 'term', headerName: 'Plazo', width: 100, type: 'number' },
  { field: 'saleDate', headerName: 'Fecha de Vta', width: 100 },
  { field: 'client', headerName: 'Cliente', width: 100 },
  { field: 'phone1', headerName: 'Teléfono 1', width: 100 },
  { field: 'phone2', headerName: 'Teléfono 2', width: 100 },
  { field: 'payments', headerName: 'Pagos', width: 100, type: 'number' },
  { field: 'onTimePayment', headerName: 'Pago Puntual', width: 100, type: 'number' },
  { field: 'advancedPayments', headerName: 'Pagos Adelantados', width: 100, type: 'number' },
  { field: 'second', headerName: '2DA', width: 100, type: 'number' },
  { field: 'dailyInterest', headerName: 'INT Diario', width: 100, type: 'number' },
  { field: 'accumulated', headerName: 'Acumulado', width: 100, type: 'number' },
  { field: 'paid', headerName: 'Pagado', width: 100, type: 'number' },
  { field: 'third', headerName: '3RA', width: 100, type: 'number' },
  { field: 'fourth', headerName: '4TA', width: 100, type: 'number' },
  { field: 'fifth', headerName: '5TA', width: 100, type: 'number' },
  { field: 'sixth', headerName: '6TA', width: 100, type: 'number' },
];

const BillingTable = () => {
  const { data } = useBilling();
  const [searchInput, setSearchInput] = useState('');

  const memoizedData = data.filter(
    (item) => {
      return (
        item.folio.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.seller.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.product.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.description.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.client.toLowerCase().includes(searchInput.toLowerCase())
      );
    },
    [searchInput],
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
