import { MouseEventHandler, memo, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import SaveButton from '../IconButtons/SaveButton';
import ResetButton from '../IconButtons/ResetButton';
import EditButton from '../IconButtons/EditButton';
import DeleteButton from '../IconButtons/DeleteButton';
import { ButtonTypeEnum } from '../IconButtons/types';
import ViewButton from '../IconButtons/ViewButton';

interface SimpleActionsCellProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

const SimpleActionsCell = ({ onEdit, onDelete, onView }: SimpleActionsCellProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        height: '100%', // Asegura que ocupe todo el alto de la celda
        width: '100%', // Asegura que ocupe todo el ancho de la celda
        alignItems: 'center', // Centra verticalmente
        justifyContent: 'center', // Centra horizontalmente (cambiado de flex-end)
        gap: '5px',
      }}
    >
      <ViewButton onClick={onView} />
      <EditButton onClick={onEdit} />
      <DeleteButton buttonType={ButtonTypeEnum.CellButton} onClick={onDelete} />
    </Box>
  );
};

export default memo(SimpleActionsCell);
