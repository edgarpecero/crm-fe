import { memo } from 'react';
import BaseIconButton, { BaseIconButtonProps } from './BaseIconButton';
import { theme } from '@/styles/Theme';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const EditButton = (props: BaseIconButtonProps) => {
  return (
    <BaseIconButton
      {...props}
      tooltip='Editar'
      icon={<OpenInNewIcon />}
      sx={{
        '&:hover': {
          color: theme.palette.primary.main,
        },
      }}
    />
  );
};
export default memo(EditButton);
