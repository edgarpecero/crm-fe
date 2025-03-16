'use clients';
import React from 'react';
import TabPanel from './EnterTabPanel';
import { reportsTabsArray } from '../reportsTabs/helpers';
import { TabsIdentifierEnum } from '../../InnerPageTabs/types';
import InnerPageTabs from '../../InnerPageTabs/InnerPageTabs';

const ReportsEnterPage = () => {
  return (
    <InnerPageTabs tabsArray={reportsTabsArray} id={TabsIdentifierEnum.reportsTabs}>
      <TabPanel />
    </InnerPageTabs>
  );
};

export default React.memo(ReportsEnterPage);
