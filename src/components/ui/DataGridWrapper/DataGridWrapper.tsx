'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
// import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { DataGrid, DataGridProps, GridRowParams, GridSortModel } from '@mui/x-data-grid';
import { theme as currentTheme } from '@/styles/Theme';
import NoResults from '../IconButtons/NoResults/NoResults';
import { getDataGridTheme, GridTheme } from './DataGridTheme';

export const expandIconStyles = { color: currentTheme.palette.grey[800], fontSize: '16px' };

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DataGridWrapperProps extends Omit<DataGridProps, 'rows'> {
  rowData: any;
  onSortChange?: (sortModel: GridSortModel) => void;
  onRowDelete?: (params: GridRowParams) => void;
  themeSelector?: GridTheme;
  notFoundSubtitle?: string;
  notFoundTitle?: string;
  notFoundIconSize?: number;
}

const DataGridWrapper = ({
  columns,
  themeSelector = GridTheme.grey,
  rowData = [],
  onSortChange,
  onRowDelete,
  notFoundSubtitle,
  notFoundTitle,
  notFoundIconSize,
  sx,
  ...props
}: DataGridWrapperProps) => {
  const [data, setData] = useState<any>([]);
  const dataGridTheme = getDataGridTheme(themeSelector);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rows: any[] = [];
    rowData.forEach((item: any, index: number) => {
      const id = index + 1;
      rows.push({ tableIndex: id, ...item });
    });
    setData(rows);
  }, [rowData]);

  const dataGridWrapperColumns = useMemo(() => {
    const baseColumns = [
      {
        field: 'tableIndex',
        headerName: '#',
        hide: true,
        flex: 0.5,
      },
      ...columns,
    ];

    if (onRowDelete) {
      const deleteColumn = {
        field: 'delete',
        headerName: '',
        sortable: false,
        maxWidth: 60,
        renderCell: (params: any) => {
          const onDelete = (e: any) => {
            e.stopPropagation();
            onRowDelete(params);
          };
          return (
            <div>
              <Tooltip title='Delete'>
                <IconButton aria-label='delete' onClick={onDelete}>
                  <ClearRoundedIcon fontSize='inherit' className='clear-icon' />
                </IconButton>
              </Tooltip>
            </div>
          );
        },
      };
      return [...baseColumns, deleteColumn];
    }
    return baseColumns;
  }, [columns, onRowDelete]);

  // useEffect(() => {
  //   if (data.length) setLoading(false);
  //   const timeoutIndex = setTimeout(() => setLoading(false), 1000);
  //   return () => clearInterval(timeoutIndex);
  // }, [data]);
  /* eslint-enable @typescript-eslint/no-explicit-any */
  return (
    <ThemeProvider theme={createTheme(dataGridTheme)}>
      <DataGrid
        rowCount={data?.length || 0}
        getRowId={(row) => row.id || row.tableIndex}
        rows={data}
        columns={dataGridWrapperColumns}
        disableColumnMenu
        disableColumnFilter
        paginationMode='server'
        sortingOrder={['asc', 'desc']} // to prevent reset sort on 3rd click
        onSortModelChange={onSortChange}
        // loading={loading}
        slots={{
          // loadingOverlay: LinearProgress,
          noResultsOverlay: () => (
            <NoResults
              title={notFoundTitle}
              subtitle={notFoundSubtitle}
              iconSize={notFoundIconSize}
            />
          ),
          noRowsOverlay: () => (
            <NoResults
              title={notFoundTitle}
              subtitle={notFoundSubtitle}
              iconSize={notFoundIconSize}
            />
          ),
        }}
        // components={{
        //   LoadingOverlay: LinearProgress,
        //   NoResultsOverlay: () => (
        //     <NoResults
        //       title={notFoundTitle}
        //       subtitle={notFoundSubtitle}
        //       iconSize={notFoundIconSize}
        //     />
        //   ),
        //   NoRowsOverlay: () => (
        //     <NoResults
        //       title={notFoundTitle}
        //       subtitle={notFoundSubtitle}
        //       iconSize={notFoundIconSize}
        //     />
        //   ),
        //   // Footer: () => <TableFooter rowCount={data?.length || 0} />,
        //   DetailPanelExpandIcon: () => (
        //     <ArrowBackIosNewRoundedIcon sx={{ ...expandIconStyles, transform: 'rotate(270deg)' }} />
        //   ),
        //   DetailPanelCollapseIcon: () => (
        //     <ArrowBackIosNewRoundedIcon sx={{ ...expandIconStyles, transform: 'rotate(90deg)' }} />
        //   ),
        //   ...(components || {}),
        // }}
        slotProps={{
          panel: {
            placement: 'bottom-end',
          },
        }}
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          '& .MuiDataGrid-cell:focus': {
            outline: 'unset',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
          },
          '& .MuiDataGrid-virtualScrollerRenderZone': {
            width: '100%',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'unset',
            fontWeight: 500,
            fontSize: 12,
          },
          ...(sx || {}),
        }}
        {...props}
      />
    </ThemeProvider>
  );
};

export default React.memo(DataGridWrapper);
