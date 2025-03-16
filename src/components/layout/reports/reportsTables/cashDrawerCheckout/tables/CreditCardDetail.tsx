import { GridColDef } from '@mui/x-data-grid';
import { TableElementProps } from '../types';
import React from 'react';
import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';

const columns: GridColDef[] = [
  {
    field: 'creditCard',
    headerName: 'Credit Card Detail',
    sortable: false,
    flex: 1,
    cellClassName: 'greyCell',
  },
  { field: 'amount', headerName: '', sortable: false, flex: 1 },
];

const CreditCardDetail = ({ rowData }: TableElementProps) => {
  return <DataGridWrapper rowData={rowData} columns={columns} hideFooter notFoundIconSize={80} />;
};

export default React.memo(CreditCardDetail);
