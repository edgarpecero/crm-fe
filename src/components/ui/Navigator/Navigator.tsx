'use client';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import React, { memo, ReactNode, useCallback, useMemo } from 'react';
import TabPanel from '../TabPanel';
import { backNavigationButtonStyles } from './styles';
import { useTabs } from '@/context/TabsContext';
import BackButton from '../BackButton';

export interface NavigatorNode {
  index: number;
  label: string;
  children?: NavigatorNode[];
  permission?: string;
  element?: React.ReactNode;
}

interface BackNavigationButtonProps {
  node: NavigatorNode;
  title?: string | null;
  onClick?: () => void;
  children?: BackButtonChildren[] | React.ReactNode;
  enterPageTitle?: string;
}

export interface BackButtonChildren {
  index: number;
  children: React.ReactNode;
}

interface NavigatorTabsProps {
  tabs: string[];
  value: number;
  defaultIndex?: number;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: any, newValue: number) => void;
}

export const mainTabIndex = 0;
const allyProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

export const getNodeByIndex = (node: NavigatorNode, index: number): NavigatorNode | null => {
  if (node.index === index) {
    return node;
  }

  if (node.children) {
    for (const childNode of node.children) {
      const result: NavigatorNode | null = getNodeByIndex(childNode, index);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

const getParentNodeByIndex = (node: NavigatorNode, index: number): NavigatorNode | null => {
  if (!node || !node.children) {
    return null;
  }

  for (const childNode of node.children) {
    if (childNode.index === index) {
      return node;
    }

    const parent = getParentNodeByIndex(childNode, index);
    if (parent) {
      return parent;
    }
  }

  return null;
};

export const getNavigatorTabsByIndex = (nodes: NavigatorNode, index = 0): string[] => {
  const node = getNodeByIndex(nodes, index);
  const tabs = node?.children?.map((tab: NavigatorNode) => tab.label);
  return tabs || [];
};

export const NavigatorTabs = React.memo(
  ({ tabs, value, onChange, defaultIndex = 0 }: NavigatorTabsProps) => {
    return (
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={onChange} aria-label='Tabs'>
          {tabs.map((tab, index) => {
            const tabValue = defaultIndex + index;
            return (
              <Tab
                key={`${tab}-tab-${tabValue}`}
                label={tab}
                {...allyProps(tabValue)}
                value={tabValue}
              />
            );
          })}
        </Tabs>
      </Box>
    );
  },
);
NavigatorTabs.displayName = 'NavigatorTabs';

export const NodeTabPanels = ({ node }: { node: NavigatorNode }) => {
  const { selectedTab } = useTabs();

  const renderTabPanels = ({ label, index, element, children }: NavigatorNode) => {
    const tabPanels: ReactNode[] = [];

    if (index === 0) {
      tabPanels.push(
        <TabPanel key={`${label}-${index}`} value={selectedTab} index={index} overflow='visible'>
          {element}
        </TabPanel>,
      );
    }

    if (children) {
      children.forEach((child) => {
        tabPanels.push(
          <TabPanel
            key={`${child.label}-${child.index}`}
            value={selectedTab}
            index={child.index}
            overflow='visible'
          >
            {child.element}
          </TabPanel>,
        );

        if (child.children) {
          const nestedNodes = renderTabPanels(child);
          tabPanels.push(...nestedNodes);
        }
      });
    }

    return tabPanels;
  };

  return <>{renderTabPanels(node)}</>;
};

const BackNavigationButtonComponent = ({
  node,
  title,
  children = [],
  onClick,
  enterPageTitle,
}: BackNavigationButtonProps) => {
  const { selectedTab, changeTab } = useTabs();
  const currentNode = useMemo(() => getNodeByIndex(node, selectedTab), [node, selectedTab]);
  const nodeParent = useMemo(() => getParentNodeByIndex(node, selectedTab), [node, selectedTab]);
  const backButtonTitle = useMemo(
    () => title || currentNode?.label || '',
    [currentNode?.label, title],
  );

  const handleGoBack = useCallback(() => {
    if (onClick) {
      onClick();
    }
    if (nodeParent !== null) {
      changeTab(nodeParent.index);
    }
  }, [nodeParent, changeTab, onClick]);

  const getBackButtonChildren = useCallback(() => {
    if (Array.isArray(children)) {
      const foundChild = children?.find((child: BackButtonChildren) => child.index === selectedTab);
      return foundChild ? foundChild.children : null;
    } else {
      return children;
    }
  }, [children, selectedTab]);

  return (
    <Box
      data-testid='back-button'
      id={`backButton-${currentNode?.label}`}
      sx={backNavigationButtonStyles}
    >
      {Boolean(nodeParent === null && enterPageTitle) && (
        <Typography variant='h2' mb={2.5}>
          {enterPageTitle}
        </Typography>
      )}
      {nodeParent !== null && <BackButton onClick={handleGoBack} title={backButtonTitle} />}
      {getBackButtonChildren()}
    </Box>
  );
};

const BackNavigationButton = memo(BackNavigationButtonComponent);

export { BackNavigationButton };
