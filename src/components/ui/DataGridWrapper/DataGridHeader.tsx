'use client';

import { Box, Button, ButtonProps } from '@mui/material';
import SearchInput from '../SearchInput';
import Link from 'next/link';

interface DataGridHeaderProps {
  handleSearch: (value: string) => void;
  buttonProps?: ButtonProps & {
    text: string;
    href?: string;
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
      {buttonProps?.text ? (
        <Link href={buttonProps.href || '#'}>
          <Button variant='contained' size='small'>
            {buttonProps?.text}
          </Button>
        </Link>
      ) : null}
    </Box>
  );
};

export default DataGridHeader;
