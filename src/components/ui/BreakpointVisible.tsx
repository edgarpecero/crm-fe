import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface BreakpointVisibleProps {
  children: React.ReactNode;
  breakpoint?: string;
}

export const BreakpointVisible = ({ children, breakpoint }: BreakpointVisibleProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(breakpoint || theme.breakpoints.down('sm'));

  return <>{matchesMobile ? children : null}</>;
};
