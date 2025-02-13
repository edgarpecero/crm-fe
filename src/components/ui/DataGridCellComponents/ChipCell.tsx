import { Chip } from '@mui/material';
import { memo } from 'react';
import { ChipTypesEnum, getChipIcon, getStylesByCashDrawerStatus } from './ChipCellHelpers';
import { GridRenderCellParams } from '@mui/x-data-grid';

const ChipCell = (params: GridRenderCellParams) => {
  const value = params.value as ChipTypesEnum;

  return (
    <Chip sx={{ ...getStylesByCashDrawerStatus(value) }} icon={getChipIcon(value)} label={value} />
  );
};

export default memo(ChipCell);
