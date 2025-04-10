'use client';

import React from 'react';
import { dateFormatter } from '@/helpers/utils';
import { QueryKeysEnum } from '@/services/config';
import { ListCustomersResponse, Customer } from '@/types/customers';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { customerService } from '@/services/customerService';
import DataGridLayout from '@/components/layout/DataGridLayout/DataGridLayout';
import { PageActionsEnum } from '@/types/enums';
import CustomerDetailsContent from './details/CustomerDetailsContent';
import { deleteCustomerAction } from '@/services/actions/customerActions';
import { useQueryData } from '@/hooks/useQueryData';
import StatusChipCell from '@/components/ui/DataGridCellComponents/StatusChipCell';

function CustomersTable({ initialData }: { initialData: ListCustomersResponse }) {
  const gridMethods = useQueryData<ListCustomersResponse>({
    queryKey: QueryKeysEnum.CUSTOMERS,
    fetchFn: () => customerService.getAll(),
    initialData,
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
      editAction: true,
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
  // {
  //   field: 'number',
  //   headerName: 'Numero',
  //   minWidth: 100,
  //   flex: 1,
  // },
  {
    field: 'name', // Unique field name for the combined column
    headerName: 'Nombre', // Header for the consolidated column
    minWidth: 200, // Adjust width as needed
    flex: 1,
    renderCell: (params: GridRenderCellParams) => `${params?.row?.name} ${params?.row?.lastName}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 140,
    renderCell: (props) => <StatusChipCell {...props} />,
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
    field: 'status',
    headerName: 'Estado',
    minWidth: 150,
    renderCell: (props) => <StatusChipCell {...props} />,
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
  {
    field: 'createdAt',
    headerName: 'Fecha de Inicio',
    width: 110,
    valueFormatter: (value) => dateFormatter(value),
  },
  {
    field: 'lastModifiedAt',
    headerName: 'Última Modificación',
    flex: 1,
    valueFormatter: (value) => dateFormatter(value),
  },
];
