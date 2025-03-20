import { MouseEventHandler, memo, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import SaveButton from '../IconButtons/SaveButton';
import ResetButton from '../IconButtons/ResetButton';
import EditButton from '../IconButtons/EditButton';
import DeleteButton from '../IconButtons/DeleteButton';
import { ButtonTypeEnum } from '../IconButtons/types';
import ViewButton from '../IconButtons/ViewButton';


const SimpleActionsCell = ({ row }: GridRenderCellParams) => {
  const onReset = useCallback(() => {
  }, []);

  const onDeleteClick = useCallback(() => {
  }, [row]);

  // const openEditMode: MouseEventHandler<HTMLButtonElement> = useCallback(
  //   (e) => {
  //     e.stopPropagation();
  //     selectRow(row);
  //   },
  //   [selectRow, row],
  // );

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        height: '100%', // Asegura que ocupe todo el alto de la celda
        width: '100%',  // Asegura que ocupe todo el ancho de la celda
        alignItems: 'center',     // Centra verticalmente
        justifyContent: 'center', // Centra horizontalmente (cambiado de flex-end)
        gap: '5px'
      }}
    >
      <ViewButton />
      <DeleteButton buttonType={ButtonTypeEnum.CellButton} onClick={onDeleteClick} />
    </Box>
  );
};

export default memo(SimpleActionsCell);
