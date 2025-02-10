import { IconButton, IconButtonProps, SxProps, Theme, Tooltip } from '@mui/material';
import Icon from '@mui/icons-material/Refresh';
import { memo } from 'react';

interface RefreshButtonProps extends IconButtonProps {
  onRefresh: () => void;
  sx?: SxProps<Theme>;
}

const RefreshButton = ({ onRefresh, sx = {} }: RefreshButtonProps) => (
  <Tooltip title='Refresh'>
    <IconButton size='large' onClick={onRefresh} sx={sx}>
      <Icon />
    </IconButton>
  </Tooltip>
);

export default memo(RefreshButton);
