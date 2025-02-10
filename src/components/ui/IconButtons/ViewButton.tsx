import { IconButton, Tooltip } from '@mui/material';
import RedTrashIcon from '../FigmaSvgVectors/RedTrashIcon';
import { memo } from 'react';
import { getIconButtonsProps } from './helpers';
import { IconButtonsProps } from './types';

const ViewButton = (props: IconButtonsProps) => {
  return (
    <Tooltip title='View'>
      <IconButton aria-label='view' {...getIconButtonsProps(props)}>
        <RedTrashIcon />
      </IconButton>
    </Tooltip>
  );
};

export default memo(ViewButton);
