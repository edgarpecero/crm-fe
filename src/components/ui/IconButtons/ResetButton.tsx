import { IconButton, Tooltip } from '@mui/material';
import { memo } from 'react';
import { getIconButtonsProps } from './helpers';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { ButtonTypeEnum, IconButtonsProps } from './types';
import { theme } from '../../theme/Theme';

const ResetButton = (props: IconButtonsProps) => {
  const defaultProps = { ...props, buttonType: ButtonTypeEnum.CellButton };

  return (
    <Tooltip title='Reset'>
      <IconButton aria-label='reset' {...getIconButtonsProps(defaultProps)}>
        <ClearRoundedIcon fontSize='small' sx={{ color: theme.palette.grey[700] }} />
      </IconButton>
    </Tooltip>
  );
};

export default memo(ResetButton);
