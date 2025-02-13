import { createContext, useContext, useState, useCallback } from 'react';
import { NestedTabsContextValue, NestedTabsProviderProps, TabsIdentifierEnum } from './types';

const NestedTabsContext = createContext<NestedTabsContextValue>({
  tabs: {},
  setTab: () => {},
});

export const NestedTabsProvider = ({
  // id and context provided for nested InnerPageTabs support
  // with id and parentTabsContext nested tabs children can change innerPageTab of any level tabs
  id,
  initialTab,
  children,
}: NestedTabsProviderProps) => {
  const [innerPageTab, setInnerPageTab] = useState(initialTab);
  const parentTabsContext = useContext(NestedTabsContext);

  const mergedTabs = { ...parentTabsContext.tabs, [id]: innerPageTab };

  const setTab = useCallback(
    (tabId: string, value: string) => {
      if (tabId === id) {
        setInnerPageTab(value);
      } else if (parentTabsContext.setTab) {
        parentTabsContext.setTab(tabId, value);
      }
    },
    [id, parentTabsContext],
  );

  return (
    <NestedTabsContext.Provider value={{ tabs: mergedTabs, setTab }}>
      {children}
    </NestedTabsContext.Provider>
  );
};

export const useInnerPageTabs = (id: TabsIdentifierEnum) => {
  const context = useContext(NestedTabsContext);
  return {
    innerPageTab: context.tabs ? context.tabs[id] : undefined,
    setInnerPageTab: context.setTab ? (value: string) => context.setTab(id, value) : undefined,
  };
};
