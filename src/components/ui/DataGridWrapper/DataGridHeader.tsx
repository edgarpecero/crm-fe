'use client';

import { Box, Button } from '@mui/material';
import SearchInput from '../SearchInput';

interface DataGridHeaderProps {
  handleSearch: (value: string) => void;
  buttonProps?: {
    title: string;
  };
}

const DataGridHeader = ({ handleSearch, buttonProps }: DataGridHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 3,
        mb: '20px',
      }}
    >
      <SearchInput
        id='manager-user-table-search'
        handleSearch={handleSearch}
        width='30%'
        autoFocus
      />
      {buttonProps?.title ? <Button size='small'>{buttonProps?.title}</Button> : null}
    </Box>
  );
};

export default DataGridHeader;
