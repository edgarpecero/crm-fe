'use client';

import DataGridPage from '@/components/layout/DataGridLayout/DataGridLayout';
import IconCell from '@/components/ui/DataGridCellComponents/IconCell';
import SimpleActionsCell from '@/components/ui/DataGridCellComponents/SimpleActionsCell';
import { dateFormatter, filterData, formatToPrice, getStaleTime } from '@/helpers/utils';
import { QueryKeysEnum } from '@/services/config';
import { getAllOrders, getAllUsers, getOrderById } from '@/services/order';
import { theme } from '@/styles/Theme';
import { Order } from '@/types/orders';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ActionModal from '@/components/ui/Modal/ActionModal';
import { Box } from '@mui/material';
import Form from '@/components/layout/reports/reportsTables/cashDrawerCheckout/Form';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultUserValues, defaultValues, userSchema } from '../orders/helpers';
import OrderForm from '../orders/details/OrderForm/OrderForm';
import ChipCell from '@/components/ui/DataGridCellComponents/ChipCell';

export interface User {
  id?: string;
  username?: string;
  name?: string;
  lastName?: string;
  email?: string;
  birthdate?: string;
  phone?: string;
  phoneSecondary?: string;
  address?: string;
  addressSecondary?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  nationalId?: string;
}

export default function UsersTable({ initialUsers }: { initialUsers: User[] }) {
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();
  const methods = useForm<any>({
    resolver: zodResolver(userSchema),
    defaultValues: order || defaultUserValues,
  });

  const memoizedData = useMemo(
    () =>
      filterData(
        initialUsers,
        searchInput,
        'name',
        'lastName',
        'email',
        'phone',
        'phoneSecondary',
        'nationalId',
      ),
    [searchInput, initialUsers],
  );

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  const renderActionsCell = useCallback(
    (params: GridRenderCellParams) => {
      const rowId = params.row.id;
      const description = params.row.description;

      const onDelete = () => {
        // selectRole({ name: name, description: description, values: [] });
        // openDeleteModal();
      };

      const onEdit = () => {
        // router.push(`/cobranza/${rowId}`);
      };
      const onView = async () => {
        try {
          const order = await getOrderById(rowId);
          if (order) {
            setOrder(order);
            setModalOpen(true);
            methods.reset(order);
          }
        } catch (error) {
          console.log(error);
        }
      };

      return <SimpleActionsCell onDelete={onDelete} onEdit={onEdit} onView={onView} />;
    },
    [router, methods],
  );

  const aColumns: GridColDef<Order>[] = [
    ...columns,
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      align: 'right',
      maxWidth: 100,
      renderCell: renderActionsCell,
    },
  ];
  const dataGridProp = {
    columns: aColumns,
    rowData: memoizedData,
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

  const dataGridHeaderProps = {
    handleSearch: handleSearch,
    buttonProps: { text: 'Crear nuevo usuario', href: 'usuarios/crear' },
  };

  const queryProps = {
    queryKey: [QueryKeysEnum.USERS],
    queryFn: getAllUsers,
    initialData: initialUsers,
    staleTime: getStaleTime(),
  };
  const title = `Detalles de la order ${order?.number}: `;

  return (
    <>
      <ActionModal size='md' open={isModalOpen} onClose={() => setModalOpen(false)} title={title}>
        <FormProvider {...methods}>
          <OrderForm onSubmit={() => {}} isModalView={true} initialOrder={order} />
        </FormProvider>

        {/* <div></div> */}
        {/* <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <ScanBarCode onScan={handleBarcodeScan} onError={handleBarcodeScanError} />
        </Box> */}
      </ActionModal>
      <DataGridPage<User[]>
        dataGridHeaderProps={dataGridHeaderProps}
        dataGridProps={dataGridProp}
        queryProps={queryProps}
      />
    </>
  );
}

const columns: GridColDef[] = [
  { field: 'number', headerName: 'Numero', flex: 1 },
  { field: 'username', headerName: 'Usuario', flex: 1 },
  { field: 'name', headerName: 'Nombre', flex: 1 },
  { field: 'lastName', headerName: 'Apellido', flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (props) => <ChipCell {...props} />,
  },
  { field: 'email', headerName: 'Correo Electrónico', flex: 1 },
  { field: 'birthdate', headerName: 'Fecha de Nacimiento', flex: 1 },
  { field: 'phone', headerName: 'Teléfono', flex: 1 },
  { field: 'phoneSecondary', headerName: 'Teléfono Secundario', flex: 1 },
  { field: 'address', headerName: 'Dirección', flex: 1 },
  { field: 'addressSecondary', headerName: 'Dirección Secundaria', flex: 1 },
  { field: 'city', headerName: 'Ciudad', flex: 1 },
  { field: 'state', headerName: 'Estado', flex: 1 },
  { field: 'country', headerName: 'País', flex: 1 },
  { field: 'zip', headerName: 'Código Postal', flex: 1 },
  { field: 'nationalId', headerName: 'ID Nacional', flex: 1 },
];
