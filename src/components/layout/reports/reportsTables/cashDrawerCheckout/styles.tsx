import { theme } from '@/styles/Theme';
import { dividerStyle, tableWithGreyFirstColumn, tableWrapperStyles } from '../common/styles';

export const dividerGridStyles = {
  margin: '20px 0',
  padding: '0 30px 8px',
  width: '100%',
  background: theme.palette.grey[300],
};

export const chipStyles = {
  background: theme.palette.grey[200],
  height: '25px',
  textTransform: 'uppercase',
  fontWeight: 700,
  color: theme.palette.success.main,
  fontSize: '10px',
};

export const dividerTitleStyles = { fontWeight: 500, marginRight: '10px' };

export const bigDividerStyle = { ...dividerStyle, marginBottom: '60px' };

export const tableGridStyles = {
  minHeight: '191px',
  maxHeight: '200px',
  marginBottom: '80px',
  ...tableWithGreyFirstColumn,
};

export const tableGridWithTotalStyles = {
  minHeight: '287px',
  ...tableWithGreyFirstColumn,
  '& .MuiDataGrid-row--lastVisible': {
    backgroundColor: theme.palette.grey[300],
  },
};

export const cashDrawerCheckoutTableStyles = {
  ...tableWrapperStyles,
  height: 'calc(100vh - 320px)',
};

export const emptyTableProgressStyle = {
  margin: '20px 0',
};

export const filledTableProgressStyle = {
  margin: '20px 0 -24px',
};
