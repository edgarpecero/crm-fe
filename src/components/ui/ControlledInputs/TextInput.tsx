import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { ControllerRenderProps, FieldError, FieldValues } from 'react-hook-form';

export interface TextInputProps extends Omit<StandardTextFieldProps, 'name'> {
  type?: string;
  maxLength?: number;
  controlError?: FieldError | null;
  field?: ControllerRenderProps<FieldValues, string>;
}

const TextInput = ({ type = 'text', id, field, maxLength, ...props }: TextInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (type === 'number') {
      // Convertir a número, o undefined si está vacío
      field?.onChange(value === '' ? undefined : Number(value));
    } else {
      field?.onChange(value);
    }
  };
  return (
    <TextField
      type={type}
      fullWidth
      id={id}
      slotProps={{
        htmlInput: {
          maxLength,
        },
      }}
      {...field}
      onChange={handleChange} // Usar nuestro manejador personalizado
      value={field?.value ?? ''} // Asegurar que el valor sea controlado
      {...props}
    />
  );
};

export default React.memo(TextInput);
