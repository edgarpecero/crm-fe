import { IconButton, Tooltip } from '@mui/material';
import { memo } from 'react';
import { getIconButtonsProps } from './helpers';
import { ButtonTypeEnum, IconButtonsProps } from './types';
import { theme } from '@/styles/Theme';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
const SaveButton = (props: IconButtonsProps) => {
  const defaultProps = { ...props, buttonType: ButtonTypeEnum.CellButton };

  return (
    <Tooltip title='Ver'>
      <IconButton aria-label='save' {...getIconButtonsProps(defaultProps)}>
        <VisibilityOutlinedIcon fontSize='small' sx={{ color: theme.palette.secondary.main }} />
      </IconButton>
    </Tooltip>
  );
};

export default memo(SaveButton);
