import { IconButton, styled, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { BreakpointVisible } from '@/components/ui/BreakpointVisible';

const DrawerHeaderStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0px 6px 0px 8px',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  '& .MuiSvgIcon-root': {
    color: theme.palette.grey[50],
  },
}));

const closeIconStyle = { width: '30px', height: '30px' };

interface DrawerHeaderProps {
  open: boolean;
  onClose: () => void;
}

const NavDrawerHeader = ({ open, onClose }: DrawerHeaderProps) => (
  <DrawerHeaderStyled>
    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
      <Typography variant='h1' sx={{ paddingLeft: 1.7, color: 'white' }}>
        {open ? 'EDGAR' : 'E'}
      </Typography>
      {/* <MenuWhiteLogo /> */}
    </span>
    {open && (
      <BreakpointVisible>
        <IconButton color='primary' onClick={onClose}>
          <CloseIcon sx={closeIconStyle} />
        </IconButton>
      </BreakpointVisible>
    )}
  </DrawerHeaderStyled>
);

export default React.memo(NavDrawerHeader);
