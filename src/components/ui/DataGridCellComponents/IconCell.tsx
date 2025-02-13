import { Icon } from '@mui/material';
import { memo } from 'react';
import { ChipTypesEnum, getChipStyleByType, getChipIcon } from './ChipCellHelpers';
import { GridRenderCellParams } from '@mui/x-data-grid';

const IconCell = (params: GridRenderCellParams) => {
  const value = params.value as ChipTypesEnum;

  return <Icon sx={{ ...getChipStyleByType(value) }}>{getChipIcon(value)} </Icon>;
};

export default memo(IconCell);
