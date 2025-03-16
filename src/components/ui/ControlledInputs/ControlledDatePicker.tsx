'use client';
import { TextFieldProps } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, FieldValues, UseFormReturn, useFormContext } from 'react-hook-form';

interface ControlledDatePickerProps
  extends Pick<Partial<TextFieldProps>, 'InputProps' | 'InputLabelProps'> {
  name: string;
  label?: string;
  required?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  disabled?: boolean;
}

const ControlledDatePicker = ({
  name,
  label = '',
  disableFuture = true,
  disabled,
  disablePast,
}: ControlledDatePickerProps) => {
  const formContext: UseFormReturn<FieldValues> | undefined = useFormContext();

  return (
    <Controller
      name={name}
      control={formContext?.control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label={label}
            // inputFormat={datePickerFormat}
            disableFuture={disableFuture}
            disablePast={disablePast}
            disabled={disabled}
            {...field}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default ControlledDatePicker;
