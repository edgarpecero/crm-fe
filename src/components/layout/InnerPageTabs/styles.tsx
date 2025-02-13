import { styled, Tab, Tabs } from '@mui/material';

export const StyledTabs = styled(Tabs)(() => ({
  marginLeft: '8px',
  marginBottom: '-2px',
  width: 'fit-content',
  height: '40px',
  minHeight: '40px',
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 12,
  height: '40px',
  minHeight: '40px',
  textTransform: 'none',
  lineHeight: '100%',
  color: theme.palette.grey[800],
  paddingRight: '30px',
  paddingLeft: '30px',
  borderBottom: `2px solid ${theme.palette.grey[400]}`,
  background: 'transparent',
}));
