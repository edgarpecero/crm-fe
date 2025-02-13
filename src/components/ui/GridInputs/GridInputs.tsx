import { Grid2, Typography } from '@mui/material';
import { InputsProps } from './types';
import { useFormContext } from 'react-hook-form';
import {
  // ControlledAutocomplete,
  // ControlledSingleSelect,
  ControlledTextInput,
  // ControlledCheckboxInput,
  // ControlledDatePicker,
  // ControlledTimePicker,
  // ControlledPasswordInput,
  // ControlledMultipleSelect,
  // ControlledCategoryAutocomplete,
  // ControlledProductAutocomplete,
  // ControlledInvoiceAutocomplete,
  // ControlledVendorAutocomplete,
} from '../ControlledInputs';

const GridInputs = ({ inputs }: { inputs: InputsProps[] }) => {
  const { control } = useFormContext();

  return (
    <>
      {inputs?.map(({ gridSize, typography, inputType, typographyProps, ...controlledProps }) => (
        <Grid2 key={controlledProps.name} size={gridSize || { xs: 12, sm: 6 }}>
          {typography ? (
            <Typography variant='h5' pb='12px' {...typographyProps}>
              {controlledProps.name}
            </Typography>
          ) : null}

          {/* {inputType === ControlledInputType.datePicker && (
              <ControlledDatePicker {...controlledProps} />
            )}
            {inputType === ControlledInputType.timePicker && (
              <ControlledTimePicker {...controlledProps} />
            )}
            {inputType === ControlledInputType.autocomplete && (
              <ControlledAutocomplete control={control} {...controlledProps} items={items || []} />
            )}
            {inputType === ControlledInputType.select && (
              <ControlledSingleSelect control={control} {...controlledProps} items={items || []} />
            )}
            {inputType === ControlledInputType.multiselect && (
              <ControlledMultipleSelect
                control={control}
                {...controlledProps}
                items={items || []}
              />
            )}
            {inputType === ControlledInputType.secret && (
              <ControlledPasswordInput control={control} {...controlledProps} type='text' />
            )}
            {inputType === ControlledInputType.checkbox && (
              <ControlledCheckboxInput control={control} {...controlledProps} />
            )} */}
          {/* {inputType === ControlledInputType.usdInput && <USDInput {...controlledProps} />} */}
          {/* {inputType === ControlledInputType.categoryAutocomplete && (
              <ControlledCategoryAutocomplete {...controlledProps} />
            )}
            {inputType === ControlledInputType.productAutocomplete && (
              <ControlledProductAutocomplete {...controlledProps} />
            )}
            {inputType === ControlledInputType.invoiceAutocomplete && (
              <ControlledInvoiceAutocomplete {...controlledProps} />
            )}
            {inputType === ControlledInputType.vendorAutocomplete && (
              <ControlledVendorAutocomplete {...controlledProps} />
            )} */}
          {!inputType && !typography && (
            <ControlledTextInput control={control} {...controlledProps} />
          )}
        </Grid2>
      ))}
    </>
  );
};

export default GridInputs;
