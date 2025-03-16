import { theme } from '@/styles/Theme';

export const backNavigationButtonStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

export const backButtonContainerStyles = {
  display: 'flex',
  justifyContent: 'flex-start !important',
  gap: 1,
};

export const iconButtonStyles = {
  height: '32px',
  width: '32px',
  padding: '8px',
  border: `1.6px solid ${theme.palette.grey[500]}`,
};
