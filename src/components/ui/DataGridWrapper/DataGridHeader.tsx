'use client';

import { Box, Button, ButtonProps, Typography } from '@mui/material';
import SearchInput from '../SearchInput';
import Link from 'next/link';

export interface DataGridHeaderProps {
  handleSearch?: (value: string) => void;
  title?: string;
  buttonProps?: ButtonProps & {
    text: string;
    href?: string;
  };
}

const DataGridHeader = ({ handleSearch, buttonProps, title }: DataGridHeaderProps) => {
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
      <Typography variant='h2'>{title.toLocaleUpperCase()}</Typography>
      {handleSearch && (
        <SearchInput
          id='manager-user-table-search'
          handleSearch={handleSearch}
          width='30%'
          autoFocus
        />
      )}
      {buttonProps?.text ? (
        <Link href={buttonProps.href || '#'}>
          <Button variant='contained' size='medium'>
            {buttonProps?.text}
          </Button>
        </Link>
      ) : null}
    </Box>
  );
};

export default DataGridHeader;
