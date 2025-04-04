'use client';

import { Customer } from '@/types/customers';
import { PageActionsEnum } from '@/types/enums';
import {
  getUserInputsForCustomerRequest,
  getUserAddressInputsForCustomerRequest,
} from '@/components/features/orders/helpers';
import TitlePage from '@/components/layout/PageLayout/TitlePage';
import TwoColumnsGrid from '@/components/layout/GridLayouts/TwoColumnsGrid';

type CustomerFormBodyProps = {
  title?: string;
  initialCustomer?: Customer | null;
  mode: PageActionsEnum;
};

export default function CustomerFormBody({ title, mode }: CustomerFormBodyProps) {
  return (
    <>
      <TitlePage title={title} />

      <TwoColumnsGrid
        title1='Registro'
        firstColInputs={getUserInputsForCustomerRequest(mode)}
        secondColInputs={getUserAddressInputsForCustomerRequest(mode)}
      />
    </>
  );
}
