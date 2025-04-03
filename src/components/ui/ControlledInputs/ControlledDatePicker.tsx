import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { parseISO } from 'date-fns';
import { esES } from '@mui/x-date-pickers/locales';
import es from 'date-fns/locale/es';
interface ControlledDatePickerProps {
  name: string;
  label?: string;
  disabled?: boolean;
}

const ControlledDatePicker = ({
  name,
  label,
  disabled,
  ...rest
}: ControlledDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // Convertimos el valor a Date si es una cadena
        const value = typeof field.value === 'string' ? parseISO(field.value) : field.value;

        return (
          <LocalizationProvider
            localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
            dateAdapter={AdapterDateFns}
            adapterLocale={es}
          >
            <DesktopDatePicker
              label={label}
              sx={{ width: '100%' }} // Estilo para ocupar el 100% del ancho
              value={value || null} // Aseguramos que sea Date o null
              onChange={(date) => {
                const newValue = typeof date === 'string' ? parseISO(date) : date;
                field.onChange(newValue);
              }}
              disabled={disabled}
              {...rest} // Pasamos props adicionales

            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default ControlledDatePicker;
