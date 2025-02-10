'use client';

import { CSSObject, Drawer, DrawerProps, Theme, styled } from '@mui/material';

interface DrawerStyledProps extends DrawerProps {
  open: boolean;
  drawerwidth: string;
}

export const NavDrawerStyled = styled(Drawer)<DrawerStyledProps>(
  ({ theme, open, drawerwidth }) => ({
    width: drawerwidth,
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      ...(open && {
        ...openedMixin(theme, drawerwidth),
        '& .MuiDrawer-paper': openedMixin(theme, drawerwidth),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiDrawer-paper': {
        backgroundColor: theme.palette.primary.main,
        width: drawerwidth,
      },
    },
    ...(open && {
      borderRadius: '0 8px 8px 0',
    }),
  }),
);

const openedMixin = (theme: Theme, drawerWidth: string): CSSObject => ({
  width: drawerWidth,
  backgroundColor: theme.palette.primary.main,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  borderRadius: '0 8px 8px 0',
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: theme.palette.primary.main,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 60,
});
