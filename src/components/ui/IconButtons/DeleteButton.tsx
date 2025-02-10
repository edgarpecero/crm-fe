import { IconButton, Tooltip } from '@mui/material';
import RedTrashIcon from '../FigmaSvgVectors/RedTrashIcon';
import { memo } from 'react';
import { getIconButtonsProps } from './helpers';
import { IconButtonsProps } from './types';

const DeleteButton = (props: IconButtonsProps) => {
  return (
    <Tooltip title='Delete'>
      <IconButton aria-label='delete' {...getIconButtonsProps(props)}>
        <RedTrashIcon />
      </IconButton>
    </Tooltip>
  );
};

export default memo(DeleteButton);
