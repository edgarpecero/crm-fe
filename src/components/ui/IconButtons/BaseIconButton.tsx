import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { memo } from 'react';

export interface BaseIconButtonProps extends IconButtonProps {
  // buttonType?: ButtonTypeEnum;
  tooltip?: string;
  icon?: React.ReactNode;
}

export enum ButtonTypeEnum {
  Default = 'default',
  CellButton = 'cellbutton',
}

const BaseIconButton = ({ tooltip, icon, ...props }: BaseIconButtonProps) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton aria-label={tooltip} {...props}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default memo(BaseIconButton);
