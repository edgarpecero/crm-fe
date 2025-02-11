'use client';

import { IconButton, InputBase, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { theme } from '@/styles/Theme';

interface SearchInputProps {
  handleSearch: (value: string) => void;
  disableOnChangeSubmit?: boolean;
  placeholder?: string;
  width?: string;
  id?: string;
  autoFocus?: boolean;
}

const SearchInput = ({
  handleSearch,
  id = 'search',
  disableOnChangeSubmit = false,
  placeholder = 'Search',
  width = '100%',
  autoFocus = false,
}: SearchInputProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
    watch,
  } = useForm({
    defaultValues: { search: '' },
  });

  useEffect(() => {
    if (!disableOnChangeSubmit) {
      const subscription = watch((values) => handleSearch(values?.search || ''));
      return () => subscription.unsubscribe();
    }
  }, [disableOnChangeSubmit, handleSubmit, watch, handleSearch]);

  return (
    <form
      id={id}
      onSubmit={handleSubmit((values) => handleSearch(values.search))}
      style={{ width }}
      noValidate
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0px 16px 0px 16px',
          width: '100%',
          border: `1.6px solid ${theme.palette.primary.main}`,
          background: 'transparent',
          borderRadius: '10px',
          alignSelf: 'stretch',
          '& .MuiInputBase-input': {
            ...theme.typography.body2,
            width: '100%',
          },
          '& .MuiIconButton-root': {
            padding: '0px !important',
          },
          '& .MuiIconButton-sizeMedium': {
            padding: '0px !important',
          },
          '& .MuiInputBase-root.MuiInputBase-colorPrimary': {
            width: '100%',
          },
        }}
      >
        <Controller
          name={'search'}
          control={control}
          render={({ field }) => (
            <InputBase
              autoFocus={autoFocus}
              placeholder={placeholder}
              inputProps={{ 'aria-label': 'search' }}
              {...field}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch(field.value);
                }
              }}
            />
          )}
        />
        {isDirty && (
          <IconButton
            size='small'
            aria-label='clear'
            sx={{ minWidth: '26px' }}
            onClick={() => {
              reset();
              handleSearch('');
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Paper>
    </form>
  );
};

export default React.memo(SearchInput);
