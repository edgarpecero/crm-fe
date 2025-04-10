import { Chip } from '@mui/material';
import { memo } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { CustomerStatus } from '@/components/features/orders/helpers';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { theme } from '@/styles/Theme';
import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const getChipIcon = (status: CustomerStatus) => {
  switch (CustomerStatus[status]) {
    case CustomerStatus.ToValidate:
      return <PauseCircleFilledIcon fontSize='small' />;
    case CustomerStatus.Active:
      return <FiberSmartRecordIcon fontSize='small' />;
    case CustomerStatus.Documentation:
      return <PendingActionsIcon fontSize='small' />;
    case CustomerStatus.Delivered:
      return <TaskAltIcon fontSize='small' />;
    case CustomerStatus.InProgress:
      return <RotateRightIcon fontSize='small' />;
    case CustomerStatus.Canceled:
      return <DoNotDisturbOnIcon fontSize='small' />;
    default:
      return <PauseCircleFilledIcon fontSize='small' />;
  }
};
const getColor = (status: CustomerStatus) => {
  switch (CustomerStatus[status]) {
    case CustomerStatus.ToValidate:
      return {
        bg: theme.palette.warning.light,
        contrast: theme.palette.warning.main,
      };
    case CustomerStatus.Active:
      return {
        bg: theme.palette.success.main,
        contrast: theme.palette.success.light,
      };
    case CustomerStatus.Documentation:
      return {
        bg: theme.palette.primary.light,
        contrast: theme.palette.primary.main,
      };
    case CustomerStatus.Delivered:
      return {
        bg: theme.palette.success.light,
        contrast: theme.palette.success.main,
      };
    case CustomerStatus.InProgress:
      return {
        bg: theme.palette.primary.main,
        contrast: theme.palette.primary.light,
      };
    case CustomerStatus.Canceled:
      return {
        contrast: theme.palette.error.dark,
        bg: theme.palette.error.light,
      };
    default:
      return {
        contrast: theme.palette.primary.main,
        bg: theme.palette.primary.light,
      };
  }
};
const StatusChipCell = (params: GridRenderCellParams) => {
  const status = params.value as CustomerStatus;
  const { bg, contrast } = getColor(status);
  return (
    <Chip
      icon={getChipIcon(status)}
      label={CustomerStatus[status]}
      sx={{
        backgroundColor: bg,
        '& .MuiChip-label': { color: contrast },
        '& .MuiChip-icon': { color: contrast },
      }}
    />
  );
};

export default memo(StatusChipCell);
