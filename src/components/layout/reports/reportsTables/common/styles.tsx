import styled from '@emotion/styled';
import { theme } from '@/styles/Theme';
import { getRowId } from '@/helpers/utils';

export const tableCardStyle = {
  backgroundColor: theme.palette.grey[50],
  borderRadius: '8px',
  border: `2px solid ${theme.palette.grey[400]}`,
  padding: '20px 0',
  position: 'relative',
  overflow: 'auto',
  height: 'calc(100vh - 155px)',
};

export const dividerStyle = {
  borderColor: theme.palette.grey[400],
  margin: '20px 0',
};

export const printButtonStyles = { position: 'absolute', right: 0, top: -52 };

export const tableWrapperStyles = {
  overflow: 'auto',
  padding: '0 30px',
};

export const tableWithGreyFirstColumn = {
  '& .greyCell': {
    backgroundColor: theme.palette.grey[300],
    borderBottom: 'unset !important',
    fontWeight: 500,
  },
  '& .MuiDataGrid-columnHeaders': {
    borderBottom: 'unset !important',
  },
};

export const tableGreyBottomRow = {
  ...tableWithGreyFirstColumn,
  '& .MuiDataGrid-row--lastVisible': {
    backgroundColor: theme.palette.grey[300],
    '& .MuiDataGrid-cell:last-child': {
      backgroundColor: theme.palette.grey[50],
    },
  },
};

export const fullHeight = { height: '100%' };
export const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
export const uploadButtonStyles = { width: '200px', marginBottom: '20px' };

export const contentStyles = {
  ...tableCardStyle,
  display: 'flex',
  flexDirection: 'column',
};

export const fullSizeTableStyles = {
  ...tableWrapperStyles,
  flex: 1,
};

export const datePickerStyles = {
  InputLabelProps: {
    sx: {
      marginTop: '32px',
    },
  },
  InputProps: {
    sx: {
      marginTop: '32px',
    },
  },
};

export const marginTopStyles = {
  sx: {
    marginTop: '32px',
  },
};

export const rowHeight = 32;
export const headerHeight = 45;

export const expandedPanelStyles = {
  border: 'none',
  backgroundColor: theme.palette.grey[300],
  '& .first-cell': {
    pl: '60px',
  },
  '& .MuiDataGrid-row:hover': {
    '.MuiDataGrid-cell': {
      backgroundColor: theme.palette.grey[400],
    },
  },
  '.MuiDataGrid-cell': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'block',
    lineHeight: '32px',
  },
};

export const tableStyles = {
  '& .MuiDataGrid-row:hover': {
    '.MuiDataGrid-cell': {
      backgroundColor: theme.palette.grey[400],
    },
  },
};

export const expandablePanelProps = {
  getRowId,
  sx: expandedPanelStyles,
  components: {
    NoRowsOverlay: () => null,
  },
  hideFooter: true,
};

export const getRowsHeightWithHeader = (rowsLength: number) =>
  (rowsLength ?? 0) * rowHeight + headerHeight;

export const footerSx = {
  borderTop: `2px solid ${theme.palette.grey[400]}`,
};

export const borderHeight = 6;
