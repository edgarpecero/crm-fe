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
import CustomizedAccordion from '@/components/ui/CustomizedAccordion/CustomizedAccordion';
type OrderFormBodyProps = {
  title?: string;
  initialOrder?: Order | null;
  mode: PageActionsEnum;
};

export default function OrderFormBody({ title, initialOrder, mode }: OrderFormBodyProps) {
  return (
    <>
      <TitlePage title={title || initialOrder?.number} />
      {/* <CustomizedAccordions /> */}
      <CustomizedAccordion
        summary='Registrar nuevo cliente'
      >
        <TwoColumnsGrid
          firstColInputs={getUserInputsForOrderRequest(mode)}
          secondColInputs={getUserAddressInputsForOrderRequest(mode)}
        />
      </CustomizedAccordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant='h3' sx={{ p: '1.5rem 0' }}>
            Registrar nuevo cliente
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TwoColumnsGrid
            firstColInputs={getUserInputsForOrderRequest(mode)}
            secondColInputs={getUserAddressInputsForOrderRequest(mode)}
          />
        </AccordionDetails>
      </Accordion> */}

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
