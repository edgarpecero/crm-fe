// 'use client';

// import { GridColDef } from '@mui/x-data-grid';
// import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
// import DataGridHeader from '@/components/ui/DataGridWrapper/DataGridHeader';
// import { useMemo, useState } from 'react';
// import { useCustomer } from '@/context/BillingContext/CustomerContext';
// import { dateFormatter, filterData } from '@/helpers/utils';

// // import { useRouter } from 'next/router';
// import ChipCell from '@/components/ui/DataGridCellComponents/ChipCell';
// import { Customer } from '@/types/customers';

// const CustomerTable = () => {
//   const { data } = useCustomer();
//   const [searchInput, setSearchInput] = useState('');

//   const memoizedData = useMemo(
//     () => filterData(data, searchInput, 'name', 'lastName'),
//     [searchInput, data],
//   );

//   const handleSearch = (value: string) => {
//     setSearchInput(value);
//   };

//   return (
//     <>
//       <DataGridHeader
//         handleSearch={handleSearch}
//         buttonProps={{ text: 'Crear Nuevo Cliente', href: 'clientes/crear' }}
//       />
//       <DataGridWrapper<Customer>
//         columns={columns}
//         rows={memoizedData}
//       />
//     </>
//   );
// };

// const columns: GridColDef<Customer>[] = [
//   { field: 'customerId', headerName: 'ID Cliente', width: 120 },
//   { field: 'name', headerName: 'Nombre', flex: 1 },
//   { field: 'lastName', headerName: 'Apellido', flex: 1 },
//   {
//     field: 'status',
//     headerName: 'Estado',
//     align: 'center',
//     renderCell: (props) => <ChipCell {...props} />,
//     flex: 1,
//   },
//   { field: 'email', headerName: 'Correo Electrónico', flex: 1 },
//   { field: 'phonePrimary', headerName: 'Teléfono Primario', flex: 1 },
//   { field: 'phoneSecondary', headerName: 'Teléfono Secundario', flex: 1 },
//   { field: 'address', headerName: 'Dirección', flex: 1 },
//   {
//     field: 'birthdate',
//     headerName: 'Fecha de Nacimiento',
//     flex: 1,
//     valueFormatter: (value) => dateFormatter(value),
//   },
//   { field: 'nationalId', headerName: 'ID Nacional', flex: 1 },
//   { field: 'licenseNumber', headerName: 'Número de Licencia', flex: 1 },
//   {
//     field: 'licenseExpiration',
//     headerName: 'Vencimiento de Licencia',
//     flex: 1,
//     valueFormatter: (value) => dateFormatter(value),
//   },
//   {
//     field: 'registrationDate',
//     headerName: 'Fecha de Registro',
//     flex: 1,
//     valueFormatter: (value) => dateFormatter(value),
//   },
//   { field: 'notes', headerName: 'Notas', flex: 1 },
// ];

// export default CustomerTable;
