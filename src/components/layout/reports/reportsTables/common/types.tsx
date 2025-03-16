import { InputsProps } from '@/components/ui/GridInputs/types';
import { Control, FieldValues, UseFormResetField } from 'react-hook-form';

export interface Filter extends InputsProps {
  isDatePicker?: boolean;
  autocomplete?: boolean;
}

export interface ReportFilterProps {
  filters: Filter[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues, any>;
  resetField: UseFormResetField<FieldValues>;
}
