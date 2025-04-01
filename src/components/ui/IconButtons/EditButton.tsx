import { memo } from 'react';
import BaseIconButton, { BaseIconButtonProps } from './BaseIconButton';
import { theme } from '@/styles/Theme';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const EditButton = (props: BaseIconButtonProps) => {
  return (
    <BaseIconButton
      {...props}
      tooltip='Editar'
      icon={<EditOutlinedIcon />}
      sx={{
        '&:hover': {
          color: theme.palette.primary.main,
        },
      }}
    />
  );
};
export default memo(EditButton);
