import { Theme, useMediaQuery } from '@mui/material';

const useDrawerWidth = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return isMobile ? '100%' : '250px';
};

export default useDrawerWidth;
