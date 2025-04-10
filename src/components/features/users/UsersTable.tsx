'use client';

import React from 'react';
import { dateFormatter } from '@/helpers/utils';
import { QueryKeysEnum } from '@/services/config';
import { ListUsersResponse, User } from '@/types/users';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { userService } from '@/services/userService';
import DataGridLayout from '@/components/layout/DataGridLayout/DataGridLayout';
import { useQueryData } from '@/hooks/useQueryData';
import { PageActionsEnum } from '@/types/enums';
import UserDetailsContent from './details/UserDetailsContent';
import { deleteUserAction } from '@/services/actions/userActions';
import StatusChipCell from '@/components/ui/DataGridCellComponents/StatusChipCell';
import { colWidth } from '@/helpers/constants';

function UsersTable({ initialData }: { initialData: ListUsersResponse }) {
  const gridMethods = useQueryData<ListUsersResponse>({
    queryKey: QueryKeysEnum.USERS,
    fetchFn: () => userService.getAll(),
    initialData,
  });
  const { data, ..._pageProps } = gridMethods;

  const pageProps = { ..._pageProps };
  const dataGridHeaderProps = {
    buttonProps: { text: 'Registrar nuevo usuario', href: 'usuarios/crear' },
    // handleSearch: () => { },
  };
  const dataGridProps = {
    columns: _columns,
    rows: data?.users || [],
    toolbar: true,
    initialState: {
      columns: {
        columnVisibilityModel: {
          addressSecondary: false,
          country: false,
          state: false,
          zip: false,
        },
      },
    },
    actionButtonsProps: {
      modalProps: {
        body: <UserDetailsContent mode={PageActionsEnum.MODALREADONLY} />,
      },
      onDeleteCb: async (user: User) => {
        await deleteUserAction(user.id);
        alert('Usuario removido exitosamente!');
        gridMethods.refetch();
      },
      editAction: true,
      deleteAction: true,
    },
  };

  return (
    <DataGridLayout<User>
      pageProps={pageProps}
      dataGridProps={dataGridProps}
      dataGridHeaderProps={dataGridHeaderProps}
    />
  );
}

export default React.memo(UsersTable);
const _columns: GridColDef<User>[] = [
  {
    field: 'employeeType',
    headerName: 'Puesto',
    width: 80, // Adjust width as needed
  },
  {
    field: 'name', // Unique field name for the combined column
    headerName: 'Nombre', // Header for the consolidated column
    minWidth: colWidth.name,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => `${params?.row?.name} ${params?.row?.lastName}`,
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
  // New fields from BaseEntity
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
  // {
  //   field: 'lastModifiedBy',
  //   headerName: 'Modificado Por',
  //   flex: 1,
  // },
  // Optional fields from UserBase
];
