'use client';

import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Customer } from './types';
import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
import DataGridHeader from '@/components/ui/DataGridWrapper/DataGridHeader';
import { useCallback, useMemo, useState } from 'react';
import { useCustomer } from '@/context/BillingContext/CustomerContext';
import { dateFormatter, filterData } from '@/helpers/utils';

// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';

const CustomerTable = () => {
  const { data, setCustomer } = useCustomer();
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const memoizedData = useMemo(
    () => filterData(data, searchInput, 'customerId', 'name', 'lastName', 'phonePrimary'),
    [searchInput, data],
  );

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  const handleRowDoubleClick = useCallback(
    ({ row }: GridRowParams) => {
      console.log('row', row);
      setCustomer(row as Customer);
      router.push(`/clientes/${row.customerId}`);
    },
    [setCustomer, router],
  );

  return (
    <>
      <DataGridHeader
        handleSearch={handleSearch}
        buttonProps={{ text: 'Crear Nuevo Cliente', href: 'clientes/crear' }}
      />
      <DataGridWrapper
        columns={columns}
        rowData={memoizedData}
        onRowDoubleClick={handleRowDoubleClick}
      />
    </>
  );
};

const columns: GridColDef<Customer>[] = [
  { field: 'customerId', headerName: 'ID Cliente', width: 100 },
  { field: 'name', headerName: 'Nombre', width: 200 },
  { field: 'lastName', headerName: 'Apellido', width: 200 },
  { field: 'email', headerName: 'Correo Electrónico', width: 250 },
  { field: 'phonePrimary', headerName: 'Teléfono Primario', width: 150 },
  { field: 'phoneSecondary', headerName: 'Teléfono Secundario', width: 150 },
  { field: 'address', headerName: 'Dirección', width: 300 },
  {
    field: 'birthdate',
    headerName: 'Fecha de Nacimiento',
    width: 150,
    valueFormatter: (value) => dateFormatter(value),
  },
  { field: 'nationalId', headerName: 'ID Nacional', width: 200 },
  { field: 'licenseNumber', headerName: 'Número de Licencia', width: 180 },
  {
    field: 'licenseExpiration',
    headerName: 'Vencimiento de Licencia',
    width: 180,
    valueFormatter: (value) => dateFormatter(value),
  },
  {
    field: 'registrationDate',
    headerName: 'Fecha de Registro',
    width: 150,
    valueFormatter: (value) => dateFormatter(value),
  },
  { field: 'notes', headerName: 'Notas', width: 300 },
];

export default CustomerTable;
