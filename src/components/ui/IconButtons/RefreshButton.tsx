import { memo } from 'react';
import BaseIconButton, { BaseIconButtonProps } from './BaseIconButton';
import Icon from '@mui/icons-material/Refresh';

const RefreshButton = (props: BaseIconButtonProps) => {
  return <BaseIconButton {...props} tooltip='Refresh' icon={<Icon />} />;
};
export default memo(RefreshButton);
