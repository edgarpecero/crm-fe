import { ReactNode } from 'react';

export type DrawerMenuRoutes = {
  label: string;
  icon: ReactNode;
  route?: string;
  // children?: DrawerChildMenuItem[];
  // permissions?: string[];
  // element?: ReactNode;
};
