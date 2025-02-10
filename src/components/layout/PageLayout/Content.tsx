import { styled } from '@mui/material';
import React from 'react';

interface ContentProps {
  hideBorderOnMobile?: boolean;
}

const Content = styled('div')<ContentProps>(({ theme, hideBorderOnMobile }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  border: `2px solid ${theme.palette.grey[400]}`,
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[50],
  flex: 1,
  padding: 20,
  [theme.breakpoints.down('sm')]: {
    border: hideBorderOnMobile ? 'none' : `2px solid ${theme.palette.grey[400]}`,
  },
}));

export default React.memo(Content);
