import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { parseISO } from 'date-fns';
import es from 'date-fns/locale/es';
import { theme } from '@/styles/Theme';
interface ControlledDatePickerProps {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

const ControlledDatePicker = ({
  name,
  label,
  disabled,
  required,
  ...rest
}: ControlledDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // Convertimos el valor a Date si es una cadena
        const value = typeof field.value === 'string' ? parseISO(field.value) : field.value;
        return (
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={es}
          >
            <DesktopDatePicker
              error={!!error}
              helperText={error?.message || ''}
              label={
                <>
                  {label} {required && <span style={{ color: theme.palette.error.main }}>*</span>}
                </>
              }
              sx={{ width: '100%' }} // Estilo para ocupar el 100% del ancho
              value={value || null} // Aseguramos que sea Date o null
              onChange={(date) => {
                const newValue = typeof date === 'string' ? parseISO(date) : date;
                field.onChange(newValue);
              }}
              disabled={disabled}
              required={required}
              {...rest} // Pasamos props adicionales

            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default ControlledDatePicker;
