import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { memo } from 'react';
import { buttonStylesMap } from './helpers';
import EditIcon from '../FigmaSvgVectors/EditIcon';
import { ButtonTypeEnum } from './types';

interface EditButtonProps extends IconButtonProps {
  buttonType?: 'default' | 'cellbutton';
}

const EditButton = ({ buttonType = ButtonTypeEnum.CellButton, sx, ...props }: EditButtonProps) => {
  const styles = { ...buttonStylesMap[buttonType], ...sx };

  return (
    <Tooltip title='Editar'>
      <IconButton aria-label='edit' size='small' sx={styles} {...props}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default memo(EditButton);
