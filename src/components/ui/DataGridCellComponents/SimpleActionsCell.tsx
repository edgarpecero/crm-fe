import { memo } from 'react';
import { Box } from '@mui/material';
import EditButton from '../IconButtons/EditButton';
import DeleteButton from '../IconButtons/DeleteButton';
import ViewButton from '../IconButtons/ViewButton';
import { usePathname } from 'next/navigation';

interface SimpleActionsCellProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

const SimpleActionsCell = ({ onEdit, onDelete, onView }: SimpleActionsCellProps) => {
  const pathname = usePathname();
  const isOrder = pathname.includes('cobranza');
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
      {!!onView && <ViewButton onClick={onView} />}
      {!!onEdit && isOrder && <EditButton onClick={onEdit} />}
      {!!onDelete && <DeleteButton onClick={onDelete} />}
    </Box>
  );
};

export default memo(SimpleActionsCell);
