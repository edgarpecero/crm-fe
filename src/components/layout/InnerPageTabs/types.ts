import { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export enum TabsIdentifierEnum {
  customerTab = 'customerTab',
  reportsTabs = 'reportsTabs',
}

export interface TabProps {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface InnerPageTabsLayoutProps {
  id: TabsIdentifierEnum;
  tabsArray: TabProps[];
  getTabsStyles?: (arg: string) => SxProps<Theme>;
  children?: ReactNode;
  headerLayout?: ReactNode;
  customHandleChange?: (newValue: string, setInnerPageTab?: (value: string) => void) => void;
}

export interface NestedTabsProviderProps extends Pick<InnerPageTabsLayoutProps, 'id' | 'children'> {
  initialTab: string;
}

export interface NestedTabsContextValue {
  tabs: { [key: string]: string };
  setTab: (id: string, value: string) => void;
}
