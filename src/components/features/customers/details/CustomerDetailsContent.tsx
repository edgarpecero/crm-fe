'use client';

import { CreateCustomerRequest, Customer, UpdateCustomerRequest } from '@/types/customers';
import { createCustomerAction, updateCustomerAction } from '@/services/actions/customerActions';
import { PageActionsEnum } from '@/types/enums';
import CustomerFormBody from './CustomerForm/CustomerFormBody';
import { customerService as service } from '@/services/customerService';
import FormLayout from '@/components/layout/FormLayout/FormLayout';
import { getUserFullname } from '@/helpers/utils';
import { createCustomerSchema, updateCustomerSchema } from '@/helpers/schemas';
import useSubmitData from '@/hooks/useSubmitData';

export type CustomerDetailsContentProps = {
  initialData?: Customer;
  id?: string;
  mode: PageActionsEnum;
};
export default function CustomerDetailsContent({
  initialData,
  mode,
  id,
}: CustomerDetailsContentProps) {
  const { handleSubmitData } = useSubmitData<
    Customer,
    CreateCustomerRequest,
    UpdateCustomerRequest
  >({
    id,
    mode,
    createRequestAction: createCustomerAction,
    updateRequestAction: updateCustomerAction,
  });
  const isCreateMode = mode === PageActionsEnum.CREATE;
  const schema = isCreateMode ? createCustomerSchema : updateCustomerSchema;
  const title =
    mode === PageActionsEnum.CREATE
      ? 'Registrar nuevo cliente'
      : `Datos del cliente: ${getUserFullname(initialData) || ''}`;

  const formProps = {
    handleSubmitData,
    initialData,
    id,
    service,
    schema,
    title,
  };

  return (
    <FormLayout mode={mode} formProps={formProps}>
      {/* Grid Section */}
      <CustomerFormBody mode={mode} title={title} />
    </FormLayout>
  );
}
