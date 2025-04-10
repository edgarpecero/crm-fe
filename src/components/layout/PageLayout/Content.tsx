'use client';

import { styled, Box, BoxProps } from '@mui/material';
import React from 'react';

interface ContentProps extends BoxProps {
  hideBorderOnMobile?: boolean;
}

const Content = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hideBorderOnMobile',
})<ContentProps>(({ theme, hideBorderOnMobile }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  border: `2px solid ${theme.palette.grey[400]}`,
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[50],
  flex: 1,
  padding: 20,
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    border: hideBorderOnMobile ? 'none' : `2px solid ${theme.palette.grey[400]}`,
    padding: '20px 10px !important',
  },
}));

export default React.memo(Content);
