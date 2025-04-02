'use client';

import { Order } from '@/types/orders';
import {
  getUserInputsForOrderRequest,
  getUserAddressInputsForOrderRequest,
  getContractInputsSectionOne,
  getContractInputsSectionTwo,
} from '../../helpers';
import { Typography } from '@mui/material';
import { PageActionsEnum } from '@/types/enums';
import TitlePage from '@/components/layout/PageLayout/TitlePage';
import TwoColumnsGrid from '@/components/layout/GridLayouts/TwoColumnsGrid';

type OrderFormBodyProps = {
  title?: string;
  initialOrder?: Order | null;
  mode: PageActionsEnum;
};

export default function OrderFormBody({ title, initialOrder, mode }: OrderFormBodyProps) {
  return (
    <>
      <TitlePage title={title || initialOrder?.number} />
      <TwoColumnsGrid
        title1='Registro'
        firstColInputs={getUserInputsForOrderRequest(mode)}
        secondColInputs={getUserAddressInputsForOrderRequest(mode)}
      />

      <Typography variant='h4' sx={{ p: '1.5rem 0' }}>
        Información adicional
      </Typography>

      <TwoColumnsGrid
        firstColInputs={getContractInputsSectionOne(mode)}
        secondColInputs={getContractInputsSectionTwo(mode)}
      />
    </>
  );
}
