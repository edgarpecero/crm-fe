import { Control, Controller, FieldValues } from 'react-hook-form';
import { StandardTextFieldProps } from '@mui/material/TextField';
import React from 'react';
import TextInput from './TextInput';

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
  id,
  maxLength = 45,
  ...props
}: ControlledTextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const _maxLength = type === 'number' ? 9 : maxLength;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          
          if (type === 'number') {
            // Solo permitir caracteres numéricos y longitud menor o igual a _maxLength
            if (/^\d*$/.test(value) && value.length <= _maxLength) {
              field.onChange(value === '' ? undefined : Number(value));
            }
          } else {
            field.onChange(value);
          }
        };

        return (
          <TextInput
            error={!!error}
            helperText={error?.message || ''}
            id={name || id}
            type={type}
            field={field}
            onChange={handleChange}
            value={field.value ?? ''}
            {...props}
            slotProps={{
              ...props.slotProps,
              htmlInput: {
                ...props.slotProps?.htmlInput,
                maxLength: _maxLength,
                pattern: type === 'number' ? '[0-9]*' : undefined
              }
            }}
          />
        );
      }}
    />
  );
};

export default React.memo(ControlledTextInput);