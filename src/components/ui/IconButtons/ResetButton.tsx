import { memo } from 'react';
import BaseIconButton, { BaseIconButtonProps } from './BaseIconButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const ResetButton = (props: BaseIconButtonProps) => {
  return <BaseIconButton {...props} tooltip='Reset' icon={<ClearRoundedIcon />} />;
};
export default memo(ResetButton);
