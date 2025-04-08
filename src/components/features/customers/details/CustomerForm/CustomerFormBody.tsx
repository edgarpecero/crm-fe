'use client';

import { Customer } from '@/types/customers';
import { PageActionsEnum } from '@/types/enums';
import {
  getCustomerRequestInputs,
  getCustomerAddressRequestInputs,
  getCustomerWorkplaceInputs,
  getCustomerWorkplaceAddressInputs,
  getCustomerBeneficiaryInputs,
  getCustomerBeneficiaryAddressInputs,
} from '@/components/features/orders/helpers';
import TitlePage from '@/components/layout/PageLayout/TitlePage';
import TwoColumnsGrid from '@/components/layout/GridLayouts/TwoColumnsGrid';
import CustomizedAccordion from '@/components/ui/CustomizedAccordion/CustomizedAccordion';

type CustomerFormBodyProps = {
  title?: string;
  initialCustomer?: Customer | null;
  mode: PageActionsEnum;
};

export default function CustomerFormBody({ title, mode }: CustomerFormBodyProps) {
  return (
    <>
      <TitlePage title={title} />
      {/* Customer */}
      <CustomizedAccordion
        summary='Datos del solicitante'
        defaultExpanded={true}
      >
        <TwoColumnsGrid
          firstColInputs={getCustomerRequestInputs(mode)}
          secondColInputs={getCustomerAddressRequestInputs(mode)}
        />
      </CustomizedAccordion>

      {/* Workplace */}
      <CustomizedAccordion
        summary='Empresa o lugar de trabajo del solicitante o del representante'
        defaultExpanded={true}
      >
        <TwoColumnsGrid
          firstColInputs={getCustomerWorkplaceInputs(mode)}
          secondColInputs={getCustomerWorkplaceAddressInputs(mode)}
        />
      </CustomizedAccordion>

      {/* Beneficiary */}
      <CustomizedAccordion
        summary='Datos del beneficiario'
        defaultExpanded={true}
      >
        <TwoColumnsGrid
          firstColInputs={getCustomerBeneficiaryInputs(mode)}
          secondColInputs={getCustomerBeneficiaryAddressInputs(mode)}
        />
      </CustomizedAccordion>
    </>
  );
}
