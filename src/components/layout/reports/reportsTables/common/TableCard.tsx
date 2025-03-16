import { Box } from '@mui/material';
import { tableCardStyle } from './styles';
import React from 'react';

interface TableCardProps {
  children: React.ReactNode;
}

const TableCard = ({ children }: TableCardProps) => {
  return (
    <Box sx={tableCardStyle} overflow='visible'>
      {children}
    </Box>
  );
};

export default React.memo(TableCard);
