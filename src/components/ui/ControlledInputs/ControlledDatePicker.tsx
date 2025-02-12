import { TextField, TextFieldProps } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, FieldValues, UseFormReturn, useFormContext } from 'react-hook-form';
import { datePickerFormat } from '../../helpers/constants';

interface ControlledDatePickerProps
  extends Pick<Partial<TextFieldProps>, 'InputProps' | 'InputLabelProps'> {
  name: string;
  label: string;
  required?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  disabled?: boolean;
}

const ControlledDatePicker = ({
  name,
  label,
  required,
  disableFuture = true,
  disabled,
  disablePast,
  ...controlledParams
}: ControlledDatePickerProps) => {
  const formContext: UseFormReturn<FieldValues> | undefined = useFormContext();

  return (
    <Controller
      name={name}
      control={formContext?.control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label={label}
            inputFormat={datePickerFormat}
            disableFuture={disableFuture}
            disablePast={disablePast}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                helperText={error?.message}
                required={required}
                fullWidth
                InputProps={{ ...params.InputProps, ...controlledParams.InputProps }}
                InputLabelProps={{
                  ...params.InputLabelProps,
                  ...controlledParams.InputLabelProps,
                }}
              />
            )}
            {...field}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default ControlledDatePicker;
