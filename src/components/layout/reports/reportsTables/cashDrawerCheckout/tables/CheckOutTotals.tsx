import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { TableElementProps } from '../types';
import React, { useEffect } from 'react';
import { formatToPrice } from '@/helpers/utils';
import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
import { useBilling } from '@/context/BillingContext/BillingContext';
import { useFormContext } from 'react-hook-form';
import { Billing } from '@/components/features/billing/types';

const columns: GridColDef[] = [
  {
    field: 'seller',
    headerName: 'Assesor',
    sortable: false,
    flex: 1,
    cellClassName: 'greyCell',
  },
  {
    field: 'totals',
    headerName: 'Total',
    sortable: false,
    valueFormatter: ({ value }) => formatToPrice(value),
    flex: 1,
  },
];

const CheckOutTotals = ({ rowData }: TableElementProps) => {
  const { data } = useBilling();
  const { getValues } = useFormContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rows, setRows] = React.useState<any>([]);

  const getTotalSalesBySeller = (
    data: Billing[],
    sellerName: string,
  ): { seller: string; totals: number }[] => {
    const total = data
      .filter((sale) => sale.seller === sellerName)
      .reduce((total, sale) => total + (sale.accumulated || 0), 0);

    return [{ seller: sellerName, totals: 123456 }];
  };

  useEffect(() => {
    if (getValues()?.salesRep) {
      const sales = getTotalSalesBySeller(data, getValues().salesRep.toUpperCase());
      setRows(sales);
    }
  }, [data, getValues]);

  return (
    <>
      <Typography variant='h4' mb='12px' mt='12px'>
        Check Out Totals
      </Typography>
      <DataGridWrapper rowData={rows} columns={columns} notFoundIconSize={80} hideFooter />
    </>
  );
};

export default React.memo(CheckOutTotals);
