'use client';

import { memo, ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getDataGridTheme } from './DataGridTheme';
import { DataGrid, DataGridProps, GridToolbar } from '@mui/x-data-grid';
import { BaseEntity } from '@/types/BaseEntity';
import useDataGridRows from '@/components/ui/DataGridWrapper/hooks/useDataGridRows';
import useDataGridCols, {
  DataGridActionButtonsProps,
} from '@/components/ui/DataGridWrapper/hooks/useDataGridCols';
import NoResults from '../IconButtons/NoResults/NoResults';

export interface DataGridWrapperProps<T extends BaseEntity> extends DataGridProps {
  rows: T[];
  actionButtonsProps?: DataGridActionButtonsProps<T>;
}

function DataGridWrapped<T extends BaseEntity>({
  rows,
  columns,
  actionButtonsProps,
  ...props
}: DataGridWrapperProps<T>) {
  const dataGridTheme = getDataGridTheme();
  const cols = useDataGridCols<T>({ cols: [...columns], actionButtonsProps });
  const _rows = useDataGridRows<T>({ rows });

  return (
    <ThemeProvider theme={createTheme(dataGridTheme)}>
      <DataGrid
        rows={_rows}
        columns={cols}
        {...props}
        density={props?.density || 'compact'}
        getRowId={(row) => row.id || row.tableIndex}
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
          panel: {
            placement: 'bottom-end',
          },
        }}
        slots={{
          toolbar: GridToolbar,
          noResultsOverlay: () => <NoResults />,
          noRowsOverlay: () => <NoResults />,
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              ...props?.initialState?.columns?.columnVisibilityModel,
              tableIndex: true,
            },
          },
        }}
      />
    </ThemeProvider>
  );
}

// Exporta el componente memoizado
const DataGridWrapper = memo(DataGridWrapped) as <T extends BaseEntity>(
  props: DataGridWrapperProps<T>,
) => ReactNode;

export default DataGridWrapper;
