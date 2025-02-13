import { Control, Controller, FieldValues } from 'react-hook-form';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import React from 'react';

export interface ControlledTextInputProps extends Omit<StandardTextFieldProps, 'name'> {
  control: Control<FieldValues> | undefined;
  name: string;
  type?: string;
  maxLength?: number;
}

const ControlledTextInput = ({
  control,
  name,
  type = 'text',
  maxLength = 40,
  id,
  ...props
}: ControlledTextInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        error={!!error}
        helperText={error?.message || ''}
        id={id || name}
        type={type}
        fullWidth
        slotProps={{
          htmlInput: {
            maxLength,
          },
        }}
        {...field}
        {...props}
      />
    )}
  />
);

export default React.memo(ControlledTextInput);
