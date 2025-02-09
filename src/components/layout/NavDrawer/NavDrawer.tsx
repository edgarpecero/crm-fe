import useDrawerWidth from "@/hooks/useDrawerWidth";
import { PropsWithChildren } from "react";
import { NavDrawerStyled } from "./NavDrawerStyled";

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const NavDrawer = ({ open, onClose, onOpen }: NavDrawerProps) => {
  const drawerWidth = useDrawerWidth();
  const drawerVariant = drawerWidth === '250px' ? 'permanent' : 'persistent';
  return (
    <NavDrawerStyled
      drawerwidth={drawerWidth}
      variant={drawerVariant}
      open={open}
    >
    </NavDrawerStyled>
  )
}

export default NavDrawer;
