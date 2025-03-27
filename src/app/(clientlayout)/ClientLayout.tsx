'use client';

import NavDrawer from '@/components/layout/NavDrawer/NavDrawer';
import Content from '@/components/layout/PageLayout/Content';
import MainStyled from '@/components/layout/PageLayout/MainStyled';
import useDrawerWidth from '@/hooks/useDrawerWidth';
import { Box } from '@mui/material';
import { memo, PropsWithChildren, useCallback, useState } from 'react';

const ClientLayout = ({ children }: PropsWithChildren) => {
  const [isNavDrawerOpen, setNavDrawerOpen] = useState(true);
  const drawerWidth = useDrawerWidth();

  const handleDrawerOpen = useCallback(() => {
    setNavDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setNavDrawerOpen(false);
  }, []);

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      <NavDrawer open={isNavDrawerOpen} onClose={handleDrawerClose} onOpen={handleDrawerOpen} />
      <MainStyled open={isNavDrawerOpen} drawerwidth={drawerWidth}>
        {/* {children} */}
        <Content>{children}</Content>
      </MainStyled>
    </Box>
  );
};

export default memo(ClientLayout);
