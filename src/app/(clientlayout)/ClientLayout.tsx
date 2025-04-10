'use client';

import NavDrawer from '@/components/layout/NavDrawer/NavDrawer';
import Content from '@/components/layout/PageLayout/Content';
import MainStyled from '@/components/layout/PageLayout/MainStyled';
import { getCurrentDate } from '@/helpers/utils';
import useDrawerWidth from '@/hooks/useDrawerWidth';
import { Box, Chip, useMediaQuery } from '@mui/material';
import { memo, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import MenuButton from '@/components/ui/IconButtons/MenuButton';
import { usePathname } from 'next/navigation';
const ClientLayout = ({ children }: PropsWithChildren) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [isNavDrawerOpen, setNavDrawerOpen] = useState(!isMobile);
  const drawerWidth = useDrawerWidth();
  const handleDrawerOpen = useCallback(() => {
    setNavDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setNavDrawerOpen(false);
  }, []);

  const handleToggleDrawer = useCallback(() => {
    setNavDrawerOpen((prev) => !prev);
  }, []);

  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    // if url changes and is not mobile, close the drawer
    if (isMobile && prevPathname.current !== null && prevPathname.current !== pathname) {
      handleToggleDrawer();
    }
    prevPathname.current = pathname;
  }, [pathname, isMobile, handleToggleDrawer]);

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      <NavDrawer open={isNavDrawerOpen} onClose={handleDrawerClose} onOpen={handleDrawerOpen} />
      <MainStyled id={'MainStyled'} open={isNavDrawerOpen} drawerwidth={drawerWidth}>
        {/* TODO: Add select to change location */}
        <Box display={'flex'} justifyContent={isMobile ? 'space-between' : 'flex-end'} p={1}>
          {isMobile && (
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
              <MenuButton onClick={handleToggleDrawer} />
            </Box>
          )}
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
            <Chip
              label={'Pachuca'}
              color={'primary'}
              sx={{ fontSize: '1.2rem', fontWeight: 600 }}
            />
            <Chip
              label={getCurrentDate()}
              color={'primary'}
              variant={'outlined'}
              sx={{ fontSize: '1.2rem', fontWeight: 600 }}
            />
          </Box>
        </Box>
        {/* {children} */}
        <Content id='Content'>{children}</Content>
      </MainStyled>
    </Box>
  );
};

export default memo(ClientLayout);
