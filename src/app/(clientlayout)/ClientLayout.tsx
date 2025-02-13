'use client';

import NavDrawer from '@/components/layout/NavDrawer/NavDrawer';
import MainStyled from '@/components/layout/PageLayout/MainStyled';
import useDrawerWidth from '@/hooks/useDrawerWidth';
import { Box } from '@mui/material';
import { PropsWithChildren, useCallback, useState } from 'react';

const ClientLayout = ({ children }: PropsWithChildren) => {
  const [isNavDrawerOpen, setNavDrawerOpen] = useState(false);
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
        {children}
        {/* <Content>{children}</Content>  */}
      </MainStyled>
    </Box>
  );
};

export default ClientLayout;
