import { Box, styled, ButtonBase, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react';

interface DrawerFooterProps {
  onOpen: () => void;
  onClose: () => void;
  open: boolean;
}

const DrawerFooterStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto 12px 0 12px',
  minHeight: '40px',
  maxHeight: '40px',
  position: 'sticky',
  bottom: 0,
  left: 0,
  pointerEvents: 'none',
  backgroundColor: theme.palette.primary.main,
  background: 'linear-gradient(180deg, rgba(22, 38, 186, 0) 0%, #1626BA 59.9%)',
  '& .MuiButtonBase-root': {
    overflow: 'hidden',
    pointerEvents: 'auto !important',
    minHeight: '40px !important',
    marginTop: 'auto',
    padding: '0px 0px 0px 8px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    '&:hover': {
      backgroundColor: theme.palette.grey[400],
      '& .MuiTypography-root': {
        color: `${theme.palette.primary.main} !important`,
      },
      '& .MuiSvgIcon-root': {
        color: `${theme.palette.primary.main} !important`,
      },
    },
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.grey[50],
  },
  '& .MuiTypography-root': {
    display: 'flex',
    paddingLeft: '18px',
    color: '#FFF !important',
    minWidth: '210px',
  },
}));

const DrawerFooter = ({ onOpen, onClose, open }: DrawerFooterProps) => {
  return (
    <DrawerFooterStyled>
      {open ? (
        <ButtonBase onClick={onClose}>
          <ChevronLeftIcon />
          <Typography variant='body2'>Ocultar Menu</Typography>
        </ButtonBase>
      ) : (
        <ButtonBase onClick={onOpen}>
          <ChevronRightIcon />
        </ButtonBase>
      )}
    </DrawerFooterStyled>
  );
};

export default React.memo(DrawerFooter);
