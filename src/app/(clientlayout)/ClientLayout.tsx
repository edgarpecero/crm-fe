'use client';

import NavDrawer from '@/components/layout/NavDrawer/NavDrawer';
import Content from '@/components/layout/PageLayout/Content';
import MainStyled from '@/components/layout/PageLayout/MainStyled';
import { getCurrentDate } from '@/helpers/utils';
import useDrawerWidth from '@/hooks/useDrawerWidth';
import { theme } from '@/styles/Theme';
import { Box, Chip, Typography } from '@mui/material';
import { memo, PropsWithChildren, useCallback, useState } from 'react';

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
        {/* TODO: Add select to change location */}
        <Box display={'flex'} justifyContent={'flex-end'} p={1}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
            <Chip label={getCurrentDate()} color={"primary"} variant={'outlined'} sx={{ fontSize: '1.5rem', fontWeight: 600 }} />
            <Chip label={'Pachuca'} color={"primary"} sx={{ fontSize: '1.5rem', fontWeight: 600 }} />
          </Box>
        </Box>
        {/* {children} */}
        <Content>{children}</Content>
      </MainStyled >
    </Box >
  );
};

export default memo(ClientLayout);
