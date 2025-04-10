import { SxProps, Theme } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { theme } from '@/styles/Theme';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import CategoryIcon from '@mui/icons-material/Category';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
export enum ChipTypesEnum {
  Active = 'Activo',
  Deactivated = 'Desactivado',
  Unconfirmed = 'UNCONFIRMED',
  Inactive = 'Inactive',
  Hold = 'En progreso',
  WriteOff = 'Write Off',
  Auto = 'AUTO',
  Store = 'STORE',
  Light = 'LIGHT',
}

// export const commonChipStyle = { fontSize: '12px', fontWeight: '700', height: 26 };

export const errorChipStyle = {
  // backgroundColor: theme.palette.error.light,
  color: theme.palette.error.main,
  height: '2.5rem',
  '& svg path': {
    fill: theme.palette.error.main,
  },
};

const errorStyle = {
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.main,
  '& svg path': {
    fill: theme.palette.error.main,
  },
};

export const mainChipStyle = {
  height: '2.5rem',

  // backgroundColor: theme.palette.error.light,
  color: theme.palette.primary.main,
  // '& svg path': {
  //   fill: theme.palette.error.main,
  // },
};

export const holdChipStyle = {
  height: '2.5rem',

  // backgroundColor: theme.palette.grey[400],
  color: 'yellow',
  // '& svg path': {
  // fill: theme.palette.grey[900],
  // },
};

const holdStyle = {
  backgroundColor: theme.palette.grey[400],
  color: theme.palette.grey[900],
  '& svg path': {
    fill: theme.palette.grey[900],
  },
};

export const successChipStyle = {
  // backgroundColor: theme.palette.success.light,
  color: theme.palette.success.main,
  // '& svg path': {
  // fill: theme.palette.success.main,
  // },
};

const successStyle = {
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.main,
  '& svg path': {
    fill: theme.palette.success.main,
  },
};

export const getStyleByType = (value: ChipTypesEnum): SxProps<Theme> => {
  if (value === ChipTypesEnum.Active) return successStyle;
  if (value === ChipTypesEnum.Deactivated) return errorStyle;
  if (value === ChipTypesEnum.Hold) return holdStyle;
  if (value === ChipTypesEnum.Unconfirmed) return holdStyle;
  return successChipStyle;
};

export const getChipStyleByType = (value: ChipTypesEnum): SxProps<Theme> => {
  if (value === ChipTypesEnum.Auto) return errorChipStyle;
  if (value === ChipTypesEnum.Light) return mainChipStyle;
  if (value === ChipTypesEnum.Unconfirmed) return mainChipStyle;
  return successChipStyle;
};

export const getChipIcon = (status: ChipTypesEnum) => {
  switch (status) {
    case ChipTypesEnum.Inactive:
    case ChipTypesEnum.Deactivated:
      return <CloseRoundedIcon fontSize='small' />;
    case ChipTypesEnum.Hold:
      return <PauseRoundedIcon fontSize='small' />;
    case ChipTypesEnum.Auto:
      return <DirectionsCarFilledIcon fontSize='small' />;
    case ChipTypesEnum.Store:
      return <CategoryIcon fontSize='small' />;
    case ChipTypesEnum.Light:
      return <TipsAndUpdatesIcon fontSize='small' />;
    case ChipTypesEnum.Unconfirmed:
      return <PauseRoundedIcon fontSize='small' />;
    default:
      return <CheckRoundedIcon fontSize='small' />;
  }
};

// export const ChipCell = (props: GridRenderCellParams) => {
//   const statusKey = props.value as keyof typeof CustomerStatus;
//   const statusValue = CustomerStatus[statusKey] || statusKey;

//   // Optional: Add styling based on status
//   const getColor = (status: keyof typeof CustomerStatus) => {
//     switch (status) {
//       case 'ToValidate': return 'warning';
//       case 'Active': return 'success';
//       case 'Canceled': return 'error';
//       default: return 'default';
//     }
//   };

//   return <Chip label={statusValue} color={getColor(statusKey)} />;
// };

export const getStylesByCashDrawerStatus = (value: string): SxProps<Theme> => {
  const fontStyle = { fontWeight: '700' };

  const statusStyles: Record<string, SxProps<Theme>> = {
    [ChipTypesEnum.Active]: {
      ...fontStyle,
      backgroundColor: theme.palette.success.light,
      color: theme.palette.success.main,
      '& .MuiSvgIcon-root': {
        color: theme.palette.success.main,
      },
    },
    [ChipTypesEnum.Deactivated]: {
      ...fontStyle,
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.dark,
      '& .MuiSvgIcon-root': {
        color: theme.palette.error.dark,
      },
    },
    [ChipTypesEnum.Store]: {
      ...fontStyle,
      backgroundColor: theme.palette.grey[300],
    },
    [ChipTypesEnum.Hold]: {
      ...fontStyle,
      backgroundColor: theme.palette.warning.light,
    },
    default: {
      ...fontStyle,
      backgroundColor: theme.palette.grey[300],
    },
    [ChipTypesEnum.Unconfirmed]: {
      ...fontStyle,
      backgroundColor: theme.palette.warning.light,
    },
  };

  return statusStyles[value] || statusStyles.default;
};
