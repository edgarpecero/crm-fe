'use client';

import React from 'react';
import { dateFormatter } from '@/helpers/utils';
import { QueryKeysEnum } from '@/services/config';
import { ListCustomersResponse, Customer } from '@/types/customers';
import { GridColDef } from '@mui/x-data-grid';
import ChipCell from '@/components/ui/DataGridCellComponents/ChipCell';
import { customerService } from '@/services/customerService';
import DataGridLayout from '@/components/layout/DataGridLayout/DataGridLayout';
import { useQueryData } from '@/hooks/useQueryData';
import { PageActionsEnum } from '@/types/enums';
import CustomerDetailsContent from './details/CustomerDetailsContent';
import { deleteCustomerAction } from '@/services/actions/customerActions';
import { useQuery } from '@tanstack/react-query';

function CustomersTable({ initialData }: { initialData: ListCustomersResponse }) {
  const gridMethods = useQuery<ListCustomersResponse>({
    queryKey: [QueryKeysEnum.CUSTOMERS],
    queryFn: () => customerService.getAll(),
    gcTime: 0,
  });
  const { data, ..._pageProps } = gridMethods;

  const pageProps = { ..._pageProps };
  const dataGridHeaderProps = {
    buttonProps: { text: 'Registrar nuevo cliente', href: 'clientes/crear' },
    // handleSearch: () => { },
  };
  const dataGridProps = {
    columns: _columns,
    rows: data?.costumers || [],
    toolbar: true,
    initialState: {
      columns: {
        columnVisibilityModel: {},
      },
    },
    actionButtonsProps: {
      modalProps: {
        body: <CustomerDetailsContent mode={PageActionsEnum.MODALREADONLY} />,
      },
      onDeleteCb: async (customer: Customer) => {
        await deleteCustomerAction(customer.id);
        alert('Cliente removido exitosamente!');
        gridMethods.refetch();
      },
    },
  };

  return (
    <DataGridLayout<Customer>
      pageProps={pageProps}
      dataGridProps={dataGridProps}
      dataGridHeaderProps={dataGridHeaderProps}
    />
  );
}

export default React.memo(CustomersTable);

const _columns: GridColDef<Customer>[] = [
  {
    field: 'number',
    headerName: 'Numero',
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
  {
    field: 'name',
    headerName: 'Nombre',
    minWidth: 120,
    flex: 1,
  },
  {
    field: 'lastName',
    headerName: 'Apellido',
    minWidth: 120,
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'birthdate',
    headerName: 'Fecha de Nacimiento',
    flex: 1,
    valueFormatter: (value) => dateFormatter(value),
  },
  {
    field: 'phone',
    headerName: 'Teléfono',
    flex: 1,
  },
  {
    field: 'phoneSecondary',
    headerName: 'Teléfono Secundario',
    flex: 1,
  },
  {
    field: 'address',
    headerName: 'Dirección',
    flex: 1,
  },
  {
    field: 'addressSecondary',
    headerName: 'Dirección Secundaria',
    flex: 1,
  },
  {
    field: 'city',
    headerName: 'Ciudad',
    flex: 1,
  },
  {
    field: 'state',
    headerName: 'Estado',
    flex: 1,
  },
  {
    field: 'country',
    headerName: 'País',
    flex: 1,
  },
  {
    field: 'zip',
    headerName: 'Código Postal',
    flex: 1,
  },
  {
    field: 'nationalId',
    headerName: 'INE',
    flex: 1,
  },
  {
    field: 'maritalStatus',
    headerName: 'Estado Civil',
    flex: 1,
  },
  {
    field: 'taxNumber',
    headerName: 'RFC',
    flex: 1,
  },
  {
    field: 'licenseNumber',
    headerName: 'Licencia de Conducir',
    flex: 1,
  },
  {
    field: 'licenseExpiration',
    headerName: 'Fecha de Expiración de Licencia',
    flex: 1,
    valueFormatter: (value) => dateFormatter(value),
  },
];
