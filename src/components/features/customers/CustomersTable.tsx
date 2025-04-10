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
import { colWidth } from '@/helpers/constants';

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
        columnVisibilityModel: {
          addressSecondary: false,
          country: false,
          zip: false,
          maritalStatus: false,
        },
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
      deleteAction: true,
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
    minWidth: colWidth.name,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => `${params?.row?.name} ${params?.row?.lastName}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: colWidth.status,
    renderCell: (props) => <StatusChipCell {...props} />,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'birthdate',
    headerName: 'Cumpleaños',
    width: colWidth.date,
    valueFormatter: (value) => dateFormatter(value),
  },
  {
    field: 'phone',
    headerName: 'Teléfono',
    width: colWidth.phone,
  },
  {
    field: 'phoneSecondary',
    headerName: 'Teléfono 2',
    width: colWidth.phone,
  },
  {
    field: 'address',
    headerName: 'Dirección',
    flex: 1,
  },
  {
    field: 'addressSecondary',
    headerName: 'Colonia',
    flex: 1,
  },
  {
    field: 'city',
    headerName: 'Ciudad',
    width: colWidth.city,
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
  // {
  //   field: 'nationalId',
  //   headerName: 'INE',
  //   flex: 1,
  // },
  {
    field: 'maritalStatus',
    headerName: 'Estado Civil',
    flex: 1,
  },
  {
    field: 'taxNumber',
    headerName: 'RFC',
    width: 130,
  },
  // {
  //   field: 'orderCount',
  //   headerName: 'Contratos',
  //   flex: 1,
  // },
  {
    field: 'createdAt',
    headerName: 'Registrado',
    width: colWidth.date,
    valueFormatter: (value) => dateFormatter(value),
  },
  {
    field: 'lastModifiedAt',
    headerName: 'Modificado',
    width: colWidth.date,
    valueFormatter: (value) => dateFormatter(value),
  },
];
