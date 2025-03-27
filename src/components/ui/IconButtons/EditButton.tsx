import { memo } from 'react';
import BaseIconButton, { BaseIconButtonProps } from './BaseIconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const EditButton = (props: BaseIconButtonProps) => {
  return <BaseIconButton {...props} tooltip='Editar' color='primary' icon={<EditOutlinedIcon />} />;
};
export default memo(EditButton);
