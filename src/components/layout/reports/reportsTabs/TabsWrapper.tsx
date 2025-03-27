'use client';
import { node } from './helpers';
import React from 'react';
import { ProvideTabs, useTabs } from '@/context/TabsContext';
import TabPanel from '@/components/ui/TabPanel';
// import { BackNavigationButton } from '@/components/ui/Navigator/Navigator';

const ReportTabs = React.memo(() => {
  const { selectedTab } = useTabs();

  return (
    <>
      <TabPanel value={selectedTab} index={node.index}>
        {node.element}
      </TabPanel>
      {node.children?.map((child) => (
        <TabPanel key={child.label} value={selectedTab} index={child.index} overflow='visible'>
          {child.element}
        </TabPanel>
      ))}
    </>
  );
});
ReportTabs.displayName = 'ReportTabs';
const ReportsTabsWrapper = () => {
  return (
    <ProvideTabs>
      {/* <BackNavigationButton node={node} /> */}
      <ReportTabs />
    </ProvideTabs>
  );
};

export default ReportsTabsWrapper;
