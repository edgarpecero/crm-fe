import { IconButton, Tooltip } from '@mui/material';
import { memo } from 'react';
import { getIconButtonsProps } from './helpers';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { ButtonTypeEnum, IconButtonsProps } from './types';
import { theme } from '../../theme/Theme';

const SaveButton = (props: IconButtonsProps) => {
  const defaultProps = { ...props, buttonType: ButtonTypeEnum.CellButton };

  return (
    <Tooltip title='Save'>
      <IconButton aria-label='save' {...getIconButtonsProps(defaultProps)}>
        <CheckRoundedIcon fontSize='small' sx={{ color: theme.palette.secondary.main }} />
      </IconButton>
    </Tooltip>
  );
};

export default memo(SaveButton);
