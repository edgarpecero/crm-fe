import { Control, Controller, FieldValues, UseFormReturn, useFormContext } from 'react-hook-form';
import TextField, { BaseTextFieldProps } from '@mui/material/TextField';
import { IconButton, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import React, { useCallback } from 'react';

export type SingleSelectItem = {
  value: number | string;
  label: React.ReactNode;
};

export interface ControlledSingleSelectProps extends Omit<BaseTextFieldProps, 'name'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<Record<string, any>, any> | undefined;
  name: string;
  items: SingleSelectItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: any) => void;
  onClear?: (name: string) => void;
  loading?: boolean;
  defaultOption?: string;
}

const ControlledSingleSelect = (props: ControlledSingleSelectProps) => {
  const {
    control,
    name,
    items,
    onChange,
    onClear,
    loading = false,
    defaultOption = 'No items',
    ...rest
  } = props;
  const formContext: UseFormReturn<FieldValues> | undefined = useFormContext();

  const onSelectClear = useCallback(
    (name: string) => {
      if (onClear) return onClear(name);
      else {
        if (formContext) formContext.resetField(name);
      }
    },
    [formContext, onClear],
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange: fieldOnChange, ...restField },
        fieldState: { error },
      }) => {
        return (
          <>
            <TextField
              onChange={(changeValue) => {
                fieldOnChange(changeValue);
                onChange && onChange(changeValue);
              }}
              error={!!error}
              id={props.id || props.name}
              helperText={error?.message ?? ''}
              select
              value={value ?? ''}
              {...rest}
              {...restField}
              SelectProps={{
                endAdornment: !!onSelectClear && value && (
                  <IconButton
                    sx={{ p: '10px', right: '8px' }}
                    aria-label='clear'
                    onClick={() => {
                      onSelectClear(name);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                ),
                IconComponent: ExpandMoreIcon,
              }}
              sx={{ width: '100%', ...(rest.sx || {}) }}
            >
              {items.length === 0 && defaultOption && (
                <MenuItem key='defaultOption'>{defaultOption}</MenuItem>
              )}
              {loading && <MenuItem key='loading'>loading...</MenuItem>}
              {!loading &&
                items.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
            </TextField>
          </>
        );
      }}
    />
  );
};

export default React.memo(ControlledSingleSelect);
