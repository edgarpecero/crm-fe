'use client';

import { Customer } from '@/components/features/customer/types';
import CustomerForm from '@/components/layout/CustomerForm/CustomerForm';
import { enumToTabsArray } from '@/components/layout/InnerPageTabs/helpers';
import InnerPageTabs from '@/components/layout/InnerPageTabs/InnerPageTabs';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';

export enum CustomerTabsEnum {
  Details = 'Detalles',
  Payments = 'Historial de pagos',
}

const CustomerPage = () => {
  const onSubmit = (data: Customer) => {
    console.log(data);
  };

  return (
    <InnerPageTabs
      tabsArray={enumToTabsArray(CustomerTabsEnum)}
      id={TabsIdentifierEnum.customerTab}
    >
      <CustomerForm onSubmit={onSubmit} />
    </InnerPageTabs>
  );
};

export default CustomerPage;
