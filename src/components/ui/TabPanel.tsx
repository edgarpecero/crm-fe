'use client';
import * as React from 'react';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number | string;
  value: number | string;
  sx?: React.CSSProperties;
  overflow?: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, sx, overflow, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: '100%', width: '100%', overflow: overflow || 'auto' }}
    >
      <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', ...sx }}>{children}</Box>
    </div>
  );
};

export default React.memo(TabPanel);
