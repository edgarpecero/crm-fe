'use client';
import { SyntheticEvent, useMemo, memo, useCallback } from 'react';
import { StyledTabs, StyledTab } from './styles';
import { NestedTabsProvider, useInnerPageTabs } from './NestedTabsProvider';
import { InnerPageTabsLayoutProps } from './types';
import { Box } from '@mui/material';
import Content from '../PageLayout/Content';

const InnerPageTabsLayout = ({
  id,
  tabsArray,
  getTabsStyles,
  children,
  headerLayout,
  customHandleChange,
}: InnerPageTabsLayoutProps) => {
  const { innerPageTab, setInnerPageTab } = useInnerPageTabs(id);

  const handleChange = useCallback(
    (_: SyntheticEvent, newValue: string) => {
      if (customHandleChange) {
        customHandleChange(newValue, setInnerPageTab);
        return;
      }
      if (setInnerPageTab) {
        setInnerPageTab(newValue);
      }
    },
    [customHandleChange, setInnerPageTab],
  );

  const sx = useMemo(
    () => getTabsStyles && getTabsStyles(innerPageTab || ''),
    [getTabsStyles, innerPageTab],
  );

  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <StyledTabs value={innerPageTab} onChange={handleChange} sx={sx}>
          {tabsArray.map(({ label, value, disabled }) => (
            <StyledTab label={label} value={value} key={label} disabled={disabled} />
          ))}
        </StyledTabs>
        {headerLayout}
      </Box>
      <Content>{children}</Content>
    </>
  );
};

const NestedInnerPageTabs = (props: InnerPageTabsLayoutProps) => (
  <NestedTabsProvider id={props.id} initialTab={props.tabsArray[0].value}>
    <InnerPageTabsLayout {...props} />
  </NestedTabsProvider>
);

export default memo(NestedInnerPageTabs);
