import { memo } from 'react';
import BaseIconButton, { BaseIconButtonProps } from './BaseIconButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
const SaveButton = (props: BaseIconButtonProps) => {
  return <BaseIconButton {...props} tooltip='Guardar' icon={<SaveAltIcon />} color='success' />;
};

export default memo(SaveButton);
