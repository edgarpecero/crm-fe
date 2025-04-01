import { memo } from 'react';
import BaseIconButton, { BaseIconButtonProps } from './BaseIconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { theme } from '@/styles/Theme';
const ViewButton = (props: BaseIconButtonProps) => {
  return (
    <BaseIconButton
      {...props}
      tooltip='Ver'
      icon={<VisibilityIcon />}
      sx={{
        '&:hover': {
          color: theme.palette.primary.main,
        },
      }}
    />
  );
};

export default memo(ViewButton);
