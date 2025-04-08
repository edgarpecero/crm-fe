'use client';

import {
  getContractInputsSectionOne,
  getContractInputsSectionTwo,
} from '../../helpers';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { PageActionsEnum } from '@/types/enums';
import TitlePage from '@/components/layout/PageLayout/TitlePage';
import TwoColumnsGrid from '@/components/layout/GridLayouts/TwoColumnsGrid';
import CustomerFormBody from '@/components/features/customers/details/CustomerForm/CustomerFormBody';
import { useState } from 'react';
import { theme } from '@/styles/Theme';
type OrderFormBodyProps = {
  title?: string;
  mode: PageActionsEnum;
};

export default function OrderFormBody({ title, mode }: OrderFormBodyProps) {
  const [showClientForm, setShowClientForm] = useState(true);
  function handleClick() {
    setShowClientForm(true);
  }

  return (
    <>
      {title && <TitlePage title={title} />}

      <FormControlLabel
        sx={{ display: 'block' }}
        control={
          <Switch
            checked={showClientForm}
            onChange={() => setShowClientForm(!showClientForm)}
            name="showClientForm"
            color="primary"
          />
        }
        labelPlacement='end'
        slotProps={{
          typography: {
            variant: 'h3',
            color: theme.palette.grey[700],
          }
        }}
        label={'Registrar nuevo cliente'}
      />
      {/* <CustomizedAccordions /> */}
      {showClientForm && (
        <CustomerFormBody
          mode={mode}
          defaultExpanded={true}
          required={false}
        />
      )}

      <Typography variant='h3' sx={{ p: '1.5rem 0', pl: 7 }}>
        Información adicional
      </Typography>

      <TwoColumnsGrid
        firstColInputs={getContractInputsSectionOne(mode)}
        secondColInputs={getContractInputsSectionTwo(mode)}
      />
    </>
  );
}
