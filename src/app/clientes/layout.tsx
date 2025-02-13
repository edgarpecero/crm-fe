import { CustomerProvider } from '@/context/BillingContext/CustomerContext';
import { ReactNode } from 'react';

const ClientesLayout = ({ children }: { children: ReactNode }) => {
  return <CustomerProvider>{children}</CustomerProvider>;
};

export default ClientesLayout;
