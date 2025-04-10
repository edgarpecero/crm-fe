import { memo } from 'react';
import BaseIconButton, { BaseIconButtonProps } from './BaseIconButton';
import MenuIcon from '@mui/icons-material/Menu';
const MenuButton = (props: BaseIconButtonProps) => {
  return (
    <BaseIconButton
      {...props}
      tooltip='Remover'
      icon={<MenuIcon fontSize='large' />}
      color='primary'
    />
  );
};

export default memo(MenuButton);
