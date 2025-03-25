import { styled } from '@mui/material';
import React from 'react';

const MainStyled = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  drawerwidth: string;
  // isauthenticated: number;
}>(
  ({
    theme,
    open,
    drawerwidth,
    // isauthenticated,
  }) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    padding: '40px',
    backgroundColor: theme.palette.grey[300],
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      marginLeft: `-${drawerwidth}`,
      backgroundColor: theme.palette.grey[50],
      padding: '0 !important',
    },
    [theme.breakpoints.down('md')]: {
      padding: '40px',
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export default React.memo(MainStyled);
