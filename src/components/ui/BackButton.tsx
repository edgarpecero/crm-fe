import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { backButtonContainerStyles, iconButtonStyles } from './Navigator/styles';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';

export type BackButtonProps = {
  onClick?: () => void;
  title?: string;
  removeMarginBottom?: boolean;
};

const BackButton = ({ onClick, title, removeMarginBottom = false }: BackButtonProps) => {
  const marginBottom = removeMarginBottom ? 0 : '20px';

  return (
    <Box sx={{ ...backButtonContainerStyles, mb: marginBottom }}>
      {!!onClick && (
        <Tooltip title='Navigate Previous'>
          <IconButton
            data-testid='back-button-icon'
            aria-label='Navigate Previous'
            onClick={onClick}
            sx={iconButtonStyles}
          >
            <NavigateBeforeRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
      {!!title && (
        <Typography aria-label='back-button-title' variant='h2'>
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default BackButton;
