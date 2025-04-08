'use client';

import { memo, ReactNode, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, DataGridProps, GridDensity, GridToolbar } from '@mui/x-data-grid';
import { BaseEntity } from '@/types/BaseEntity';
import useDataGridRows from '@/components/ui/DataGridWrapper/hooks/useDataGridRows';
import useDataGridCols, {
  DataGridActionButtonsProps,
} from '@/components/ui/DataGridWrapper/hooks/useDataGridCols';
import NoResults from '@/components/ui/IconButtons/NoResults/NoResults';
import { theme } from '@/styles/Theme';
import localizedTextsMap from './helpers';

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
  const [density, setDensity] = useState<GridDensity>('compact');
  const dataGridTheme = createTheme({ ...theme });
  const cols = useDataGridCols<T>({ cols: [...columns], actionButtonsProps });
  const _rows = useDataGridRows<T>({ rows });

  return (
    <ThemeProvider theme={createTheme(dataGridTheme)}>
      <DataGrid
        rows={_rows}
        columns={cols}
        {...props}
        density={density}
        onDensityChange={(density) => setDensity(density)}
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
              lastModifiedAt: false,
            },
          },
        }}
        localeText={localizedTextsMap}
      />
    </ThemeProvider>
  );
}

const DataGridWrapper = memo(DataGridWrapped) as <T extends BaseEntity>(
  props: DataGridWrapperProps<T>,
) => ReactNode;

export default DataGridWrapper;
