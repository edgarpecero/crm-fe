import { Control, Controller, FieldValues } from 'react-hook-form';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
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
  maxLength = 40,
  id,
  ...props
}: ControlledTextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          if (type === 'number') {
            // Convertir a número, o undefined si está vacío
            field.onChange(value === '' ? undefined : Number(value));
          } else {
            field.onChange(value);
          }
        };
        return (
          <TextInput
            error={!!error}
            helperText={error?.message || ''}
            id={name}
            type={type}
            field={field}
            onChange={handleChange} // Usar nuestro manejador personalizado
            value={field.value ?? ''} 
            {...props}
          />
        );
      }}
    />
  );
};

export default React.memo(ControlledTextInput);
