'use client';

import { theme } from '@/styles/Theme';
import { CSSProperties } from 'react';

export const noResultsWrapperStyles: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0px',
  padding: '15px 0',
  background: theme.palette.grey[300],
};
