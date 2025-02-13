'use client';
import { Customer } from '@/components/features/customer/types';
import CustomerForm from '@/components/features/customer/CustomerForm';
import { enumToTabsArray } from '@/components/layout/InnerPageTabs/helpers';
import InnerPageTabs from '@/components/layout/InnerPageTabs/InnerPageTabs';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
import CustomerPayments from './CustomerPayments';

export enum CustomerTabsEnum {
  Details = 'Detalles',
  Payments = 'Historial de pagos',
}

const CustomerTabPanel = () => {
  const onSubmit = (data: Customer) => {
    console.log(data);
  };

  return (
    <InnerPageTabs
      tabsArray={enumToTabsArray(CustomerTabsEnum)}
      id={TabsIdentifierEnum.customerTab}
    >
      <CustomerForm onSubmit={onSubmit} />
      <CustomerPayments />
    </InnerPageTabs>
  );
};

export default CustomerTabPanel;
