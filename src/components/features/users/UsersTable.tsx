'use client';

import React from 'react';
import { dateFormatter } from '@/helpers/utils';
import { QueryKeysEnum } from '@/services/config';
import { ListUsersResponse, User } from '@/types/users';
import { GridColDef } from '@mui/x-data-grid';
import ChipCell from '@/components/ui/DataGridCellComponents/ChipCell';
import { userService } from '@/services/userService';
import DataGridLayout from '@/components/layout/DataGridLayout/DataGridLayout';
import { useQueryData } from '@/hooks/useQueryData';
import { PageActionsEnum } from '@/types/enums';
import UserDetailsContent from './details/UserDetailsContent';
import { deleteUserAction } from '@/services/actions/userActions';

function UsersTable({ initialData }: { initialData: ListUsersResponse }) {
  const gridMethods = useQueryData<ListUsersResponse>({
    queryKey: QueryKeysEnum.USERS,
    fetchFn: () => userService.getAll(),
    initialData,
  });
  const { data, ..._pageProps } = gridMethods;

  const pageProps = { ..._pageProps };
  const dataGridHeaderProps = {
    buttonProps: { text: 'Crear nuevo usuario', href: 'usuarios/crear' },
    // handleSearch: () => { },
  };
  const dataGridProps = {
    columns: _columns,
    rows: data?.users || [],
    toolbar: true,
    initialState: {
      columns: {
        columnVisibilityModel: {},
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
    field: 'username',
    headerName: 'Usuario',
    minWidth: 120,
    flex: 1,
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
];
