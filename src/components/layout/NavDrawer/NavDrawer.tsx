'use client';

import useDrawerWidth from '@/hooks/useDrawerWidth';
import { DrawerStyled } from './DrawerStyled';
import NavDrawerFooter from './NavDrawerFooter';
import { theme } from '@/styles/Theme';
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@mui/material';
import NavDrawerHeader from './NavDrawerHeader';
import { BreakpointVisible } from '@/components/ui/BreakpointVisible';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { DrawerMenuRoutes } from './types';
import ContactsIcon from '@mui/icons-material/Contacts';
import List from '@mui/material/List';
import Link from 'next/link';

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const DrawerMenuItem = (props: DrawerMenuRoutes) => {
  return (
    <ThemeProvider theme={theme}>
      <Link href={props.route || ''}>
        <Tooltip title={props.label} placement='right' sx={{ fontSize: '20px' }}>
          <Box
            sx={{
              mt: 2,
              padding: '0px 12px 0px 8px',
              display: 'flex',
              color: 'white',
              alignItems: 'center',
              minHeight: '45px !important',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.grey[600],
                color: `${theme.palette.primary.main} !important`,
                '& .MuiSvgIcon-root': {
                  color: `${theme.palette.primary.main} !important`,
                },
                '& .MuiTypography-root': {
                  color: `${theme.palette.primary.main} !important`,
                },
              },
            }}
          >
            <ListItemIcon sx={{ alignItems: 'center', color: 'white', minWidth: '40px' }}>
              {props.icon}
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography variant='h3' sx={{ color: 'white' }}>
                  {props.label}
                </Typography>
              }
            />
          </Box>
        </Tooltip>
      </Link>
    </ThemeProvider>
  );
};

const NavDrawer = ({ open, onClose, onOpen }: NavDrawerProps) => {
  const drawerWidth = useDrawerWidth();
  const drawerVariant = drawerWidth === '250px' ? 'permanent' : 'persistent';
  return (
    <DrawerStyled drawerwidth={drawerWidth} variant={drawerVariant} open={open}>
      <NavDrawerHeader open={open} onClose={onClose} />
      <Divider />
      <List disablePadding sx={{ margin: '0 12px', paddingTop: '16px' }}>
        {routes.map((props, index) => (
          <DrawerMenuItem key={index} {...props} />
        ))}
      </List>
      <BreakpointVisible breakpoint={theme.breakpoints.up('sm')}>
        <NavDrawerFooter open={open} onOpen={onOpen} onClose={onClose} />
      </BreakpointVisible>
    </DrawerStyled>
  );
};

const routes: DrawerMenuRoutes[] = [
  {
    label: 'Cobranza',
    icon: <PointOfSaleIcon />,
    route: '/cobranza',
  },
  {
    label: 'Clientes',
    icon: <ContactsIcon />,
    route: '/clientes',
  },
  {
    label: 'Usuarios',
    icon: <SupervisorAccountOutlinedIcon />,
    route: '/usuarios',
  },
  {
    label: 'Inventorio',
    icon: <DirectionsCarIcon />,
    route: '/inventario',
  },
  {
    label: 'Reportes',
    icon: <ListAltIcon />,
    route: '/reportes',
  },
];

export default NavDrawer;
