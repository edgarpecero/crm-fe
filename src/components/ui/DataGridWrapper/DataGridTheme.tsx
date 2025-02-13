import { GridCellParams } from '@mui/x-data-grid';
import { createTheme } from '@mui/material/styles';
import { theme } from '@/styles/Theme';

const greyDataGridTheme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        rowHeight: 32,
        // headerHeight: 45,
      },
      styleOverrides: {
        root: {
          height: '100% !important',
          fontWeight: '600',
          border: `3px solid ${theme.palette.grey[300]}`,
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.grey[400]} !important`,
          },
          '& .clear-icon path': {
            fill: theme.palette.grey[700],
          },
          '& .MuiDataGrid-detailPanelToggleCell:disabled': {
            opacity: 0,
          },
          '& .red-row': {
            backgroundColor: theme.palette.error.light,
            '&:hover': {
              backgroundColor: theme.palette.error.main,
            },
          },
        },
        columnHeader: {
          backgroundColor: theme.palette.grey[300],
          fontWeight: '600',
        },
        columnHeaders: {
          borderColor: theme.palette.grey[400],
          backgroundColor: theme.palette.grey[300],
          borderBottom: `1px solid ${theme.palette.grey[400]}`,
        },
        columnHeaderTitle: {
          fontWeight: '600',
        },
        columnSeparator: {
          // opacity: '0 !important',
        },
        rowReorderCell: {
          '& svg path': {
            fill: theme.palette.grey[700],
          },
          cell: {
            borderBottom: `1px solid ${theme.palette.grey[400]} !important`,
          },
          row: {
            ':hover': {
              backgroundColor: theme.palette.grey[400],
            },
          },
          columnHeader: {
            backgroundColor: theme.palette.grey[300],
            fontWeight: '600',
          },
          columnHeaders: {
            borderColor: theme.palette.grey[400],
            backgroundColor: theme.palette.grey[300],
            borderBottom: `1px solid ${theme.palette.grey[400]}`,
          },
          columnHeaderTitle: {
            fontWeight: '600',
          },
          columnSeparator: {
            opacity: '0 !important',
          },
          rowReorderCell: {
            '& svg path': {
              fill: theme.palette.grey[700],
            },
          },
          '.MuiDataGrid-columnHeader--moving': {
            backgroundColor: theme.palette.grey[50],
          },
        },
      },
    },
  },
});

const spreadSheetTheme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getCellClassName: (params: GridCellParams<any, any, number>) => {
          if (params.isEditable) return 'editableCell';
          return 'disableCell';
        },
      },
      styleOverrides: {
        root: {
          '& .spreadSheet': {
            backgroundColor: `${theme.palette.grey[300]} !important`,
            color: `${theme.palette.grey[900]} !important`,
            borderBottom: 'unset !important',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: 'unset !important',
          },
          '& .lastRow': {
            backgroundColor: `${theme.palette.grey[300]} !important`,
          },
          '& .disableCell': {
            color: `${theme.palette.grey[800]}`,
          },
          '& .editableCell': {
            '& .MuiDataGrid-cellContent': {
              fontWeight: 900,
            },
            '&:hover': {
              backgroundColor: theme.palette.grey[600],
            },
            '&:focus-within': {
              backgroundColor: 'initial',
            },
          },
          '& .noCellPadding': {
            padding: '0 !important',
          },
        },
      },
    },
  },
});

const boldTheme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        rowHeight: 30,
        // headerHeight: 36,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: 'none',
        },
        columnHeader: {
          fontWeight: 600,
          fontSize: '11px',
          color: theme.palette.grey[800],
        },
        row: {
          height: '30px',
          backgroundColor: theme.palette.grey[300],
        },
        cell: {
          fontWeight: '900 !important',
          color: theme.palette.grey[900],
          fontSize: '11px !important',
        },
      },
    },
  },
});

export enum GridTheme {
  'default' = 'default',
  'grey' = 'grey',
  'spreadSheet' = 'spreadSheet',
  'bold' = 'bold',
}

export const getDataGridTheme = (themeSelector?: GridTheme) => {
  switch (themeSelector) {
    case GridTheme.grey:
      return greyDataGridTheme;
    case GridTheme.bold:
      return createTheme(greyDataGridTheme, boldTheme);
    case GridTheme.spreadSheet:
      return createTheme(greyDataGridTheme, spreadSheetTheme);
    default:
      return createTheme();
  }
};
