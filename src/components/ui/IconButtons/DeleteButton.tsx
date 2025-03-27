import { memo } from 'react';
import BaseIconButton, { BaseIconButtonProps } from './BaseIconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const DeleteButton = (props: BaseIconButtonProps) => {
  return <BaseIconButton {...props} tooltip='Remover' icon={<DeleteForeverIcon />} color='error' />;
};

export default memo(DeleteButton);
