'use client';

import useDrawerWidth from '@/hooks/useDrawerWidth';
import { NavDrawerStyled } from './NavDrawerStyled';

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const NavDrawer = ({ open }: NavDrawerProps) => {
  const drawerWidth = useDrawerWidth();
  const drawerVariant = drawerWidth === '250px' ? 'permanent' : 'persistent';
  return (
    <NavDrawerStyled
      drawerwidth={drawerWidth}
      variant={drawerVariant}
      open={open}
    ></NavDrawerStyled>
  );
};

export default NavDrawer;
