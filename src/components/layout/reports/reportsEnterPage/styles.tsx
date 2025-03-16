import { theme } from '@/styles/Theme';
import { CardActionArea, styled } from '@mui/material';

const reportCardStyle = {
  backgroundColor: theme.palette.grey[50],
  borderRadius: '8px',
  border: `2px solid ${theme.palette.grey[400]}`,
};

export const boxStyle = {
  ...reportCardStyle,
  padding: '30px',
};

export const Card = styled(CardActionArea)(({ theme }) => ({
  ...reportCardStyle,
  height: '100%',
  borderColor: theme.palette.grey['300'],
  padding: '16px 19px',
}));
