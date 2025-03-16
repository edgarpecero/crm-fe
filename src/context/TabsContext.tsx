'use client';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface UseTabs {
  selectedTab: number;
  changeTab: (index: number) => void;
}

type Props = {
  children?: React.ReactNode;
  defaultTab?: number;
};

const TabsContext = createContext({} as UseTabs);

export const ProvideTabs = React.memo(({ children, defaultTab = 0 }: Props) => {
  const Tabs = useProvideTabs(defaultTab);
  return <TabsContext.Provider value={Tabs}>{children}</TabsContext.Provider>;
});

ProvideTabs.displayName = 'ProvideTabs';

export const useTabs = () => {
  return useContext(TabsContext);
};

const useProvideTabs = (defaultTab = 0): UseTabs => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  const changeTab = useCallback((index: number) => {
    setSelectedTab(index);
  }, []);

  return {
    selectedTab,
    changeTab,
  };
};
