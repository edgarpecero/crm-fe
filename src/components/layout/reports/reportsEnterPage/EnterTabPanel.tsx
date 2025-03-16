import React, { useMemo } from 'react';
import { Grid2, Typography } from '@mui/material';
import { ReportTabsEnum, lg, node, reportOptions } from '../reportsTabs/helpers';
import { Card } from './styles';
import { useTabs } from '@/context/TabsContext';
import { useInnerPageTabs } from '../../InnerPageTabs/NestedTabsProvider';
import { TabsIdentifierEnum } from '../../InnerPageTabs/types';
import ReportIcon from '@/components/ui/FigmaSvgVectors/ReportIcon';

const ReportsEnterTabPanel = () => {
  // const { permissions } = usePermissions();
  const { changeTab } = useTabs();
  const { innerPageTab } = useInnerPageTabs(TabsIdentifierEnum.reportsTabs);

  const onCardClick = (label: string) => {
    const currentReportIndex = node.children?.find((child) => child.label === label)?.index;
    if (currentReportIndex) changeTab(currentReportIndex);
  };

  const filteredByTabCards = useMemo(() => {
    if (innerPageTab === ReportTabsEnum.all) {
      return reportOptions;
    } else {
      return reportOptions.filter(({ type }) => type === innerPageTab);
    }
  }, [innerPageTab]);

  return (
    // <Box sx={boxStyle}>
    <Grid2 container spacing={2.5}>
      {filteredByTabCards.map(({ label }) => (
        <Grid2 key={label} size={{ xs: 12, sm: 6, lg: lg }}>
          <Card onClick={() => onCardClick(label)} data-testid='report-card'>
            <ReportIcon />
            <Typography mt={2} mb={0.5} variant='h4'>
              {label}
            </Typography>
          </Card>
        </Grid2>
      ))}
    </Grid2>
    // </Box>
  );
};

export default React.memo(ReportsEnterTabPanel);
