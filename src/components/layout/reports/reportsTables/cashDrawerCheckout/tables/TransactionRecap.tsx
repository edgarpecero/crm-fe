import { GridColDef } from '@mui/x-data-grid';
import { TableElementProps } from '../types';
import React, { useEffect } from 'react';
import { dateFormatter, formatToPrice } from '@/helpers/utils';
import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
import { useBilling } from '@/context/BillingContext/BillingContext';
import { useFormContext } from 'react-hook-form';

const columns: GridColDef[] = [
  { field: 'folio', headerName: 'Folio', flex: 1 },
  {
    field: 'amount',
    headerName: 'Total Sales',
    type: 'number',
    flex: 1,
  },
  {
    field: 'monthly',
    headerName: 'Mensual',
    width: 120,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'saleDate',
    headerName: 'Fecha de Vta',
    flex: 1,
    valueFormatter: (value) => dateFormatter(value),
  },
  {
    field: 'paid',
    headerName: 'Pagado',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
  {
    field: 'accumulated',
    headerName: 'Acumulado',
    flex: 1,
    valueFormatter: (value) => formatToPrice(value),
  },
];

const TransactionRecap = ({ rowData }: TableElementProps) => {
  const { data } = useBilling();
  const { getValues } = useFormContext();
  const [rows, setRows] = React.useState<any>([]);

  useEffect(() => {
    if (getValues()?.salesRep) {
      const sales = data.filter((item) => item.seller === getValues().salesRep.toUpperCase());

      setRows(sales);
    }
  }, [data, getValues]);

  return <DataGridWrapper rowData={rows} columns={columns} notFoundIconSize={80} hideFooter />;
};

export default React.memo(TransactionRecap);
