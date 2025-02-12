import { Customer } from '@/components/features/customer/types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, defaultValuesCustomer } from '@/helpers/formSchemas';

const CreateNewCustomerPage = () => {
  const methods = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: defaultValuesCustomer,
    mode: 'all',
  });

  const onSubmit = (data: Customer) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}></form>
    </FormProvider>
  );
};

export default CreateNewCustomerPage;
