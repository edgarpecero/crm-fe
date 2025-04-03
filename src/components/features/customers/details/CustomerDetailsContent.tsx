'use client';

import { Customer, CustomerRequest } from '@/types/customers';
import { useCallback } from 'react';
import { createCustomerAction, updateCustomerAction } from '@/services/actions/customerActions';
import { PageActionsEnum } from '@/types/enums';
import CustomerFormBody from './CustomerForm/CustomerFormBody';
import { customerService } from '@/services/customerService';
import FormLayout, { FormProps } from '@/components/layout/FormLayout/FormLayout';
import { getUserFullname } from '@/helpers/utils';
import { customerSchema } from '@/helpers/schemas';

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
  //TODO: FIX HERE
  //eslint-disable-next-line
  const createNewCustomer = useCallback(async (data: any) => {
    // logic to format data before sending
    data.username = data.email;
    return await createCustomerAction(data as CustomerRequest);
  }, []);

  const updateCustomer = useCallback(
    //eslint-disable-next-line
    async (id: string, data: any) => {
      // logic to format data before sending
      // data.customerId = initialData.customerId;
      return await updateCustomerAction(id, data);
    },
    [],
  );

  const title =
    mode === PageActionsEnum.CREATE
      ? 'Registrar nuevo cliente'
      : `Detalles del cliente: ${getUserFullname(initialData) || ''}`;

  const formProps: FormProps<Customer, CustomerRequest> = {
    schema: customerSchema,
    service: customerService,
    // mapToRequest: (data?: Customer) => data as any,
    createRequestAction: createNewCustomer,
    updateRequestAction: updateCustomer,
    id,
    initialData,
    title,
  };

  return (
    <FormLayout mode={mode} formProps={formProps}>
      {/* Grid Section */}
      <CustomerFormBody mode={mode} title={title} />
    </FormLayout>
  );
}
