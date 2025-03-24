import { BaseTextFieldProps, GridBaseProps, TypographyProps } from '@mui/material';
// import { SingleSelectItem } from '../ControlledInputs/ControlledSingleSelect';

export enum ControlledInputType {
  select = 'select',
  datePicker = 'datePicker',
  timePicker = 'timePicker',
  checkbox = 'checkbox',
  autocomplete = 'autocomplete',
  input = 'input',
  secret = 'secret',
  usdInput = 'usdInput',
  multiselect = 'multiselect',
  categoryAutocomplete = 'categoryAutocomplete',
  productAutocomplete = 'productAutocomplete',
  invoiceAutocomplete = 'invoiceAutocomplete',
  vendorAutocomplete = 'vendorAutocomplete',
  readOnly = 'readOnly',
}

//TODO: Add SingleSelectItem type for Items prop
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InputsProps extends Omit<BaseTextFieldProps, 'label' | 'variant'> {
  name: string;
  label?: string;
  items?: any[];
  gridSize?: GridBaseProps['size'];
  typography?: boolean;
  onClear?: (name: string) => void;
  inputType?: ControlledInputType;
  customConvertItems?: (items: any[]) => any[];
  typographyProps?: Partial<TypographyProps>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
export interface GridInputsProps {
  inputs: InputsProps[];
}

export interface InputSection {
  title: string;
  inputSections: InputsProps[][];
}
