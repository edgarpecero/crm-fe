'use client';

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
import { FormBodyProps } from '@/components/layout/FormLayout/FormLayout';

export default function CustomerFormBody({
  title,
  mode,
  defaultExpanded = true,
  parentName,
}: FormBodyProps) {
  return (
    <>
      {title && <TitlePage title={title} />}
      {/* Customer */}
      <CustomizedAccordion summary='Datos del solicitante' defaultExpanded={defaultExpanded}>
        <TwoColumnsGrid
          firstColInputs={getCustomerRequestInputs(mode, parentName)}
          secondColInputs={getCustomerAddressRequestInputs(mode, parentName)}
        />
      </CustomizedAccordion>

      {/* Workplace */}
      <CustomizedAccordion
        summary='Empresa o lugar de trabajo del solicitante o del representante'
        defaultExpanded={defaultExpanded}
      >
        <TwoColumnsGrid
          firstColInputs={getCustomerWorkplaceInputs(mode, parentName)}
          secondColInputs={getCustomerWorkplaceAddressInputs(mode, parentName)}
        />
      </CustomizedAccordion>

      {/* Beneficiary */}
      <CustomizedAccordion summary='Datos del beneficiario' defaultExpanded={defaultExpanded}>
        <TwoColumnsGrid
          firstColInputs={getCustomerBeneficiaryInputs(mode, parentName)}
          secondColInputs={getCustomerBeneficiaryAddressInputs(mode, parentName)}
        />
      </CustomizedAccordion>
    </>
  );
}
