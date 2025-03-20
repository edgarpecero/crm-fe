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
}: ControlledTextInputProps) => {
  console.log('control', control);
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
            onChange={handleChange} // Usar nuestro manejador personalizado
            value={field.value ?? ''} // Asegurar que el valor sea controlado
            {...props}
          />
        )
      }}
    />
  )
};

export default React.memo(ControlledTextInput);
