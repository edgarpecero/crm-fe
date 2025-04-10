import { Chip } from '@mui/material';
import { memo } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import CategoryIcon from '@mui/icons-material/Category';
import { theme } from '@/styles/Theme';
import { ProductType } from '@/components/features/orders/helpers';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
const getChipIcon = (status: ProductType) => {
  switch (ProductType[status]) {
    case ProductType.Vehicle:
      return <AirportShuttleIcon fontSize='small' />;
    case ProductType.Motorcycle:
      return <TwoWheelerIcon fontSize='small' />;
    case ProductType.PIM:
      return <AccountBalanceIcon fontSize='small' />;
    default:
      return <CategoryIcon fontSize='small' />;
  }
};

const getColor = (status: ProductType) => {
  switch (ProductType[status]) {
    case ProductType.Vehicle:
      return {
        bg: theme.palette.error.main,
        contrast: theme.palette.error.light,
      };
    case ProductType.Motorcycle:
      return {
        bg: theme.palette.success.main,
        contrast: theme.palette.success.light,
      };
    case ProductType.PIM:
      return {
        bg: theme.palette.primary.main,
        contrast: theme.palette.primary.light,
      };
    default:
      return {
        contrast: theme.palette.error.dark,
        bg: theme.palette.error.light,
      };
  }
};
const ProductChipCell = (params: GridRenderCellParams) => {
  const type = params.value as ProductType;
  const { bg } = getColor(type);
  return (
    <Chip
      icon={getChipIcon(type)}
      label={ProductType[type]}
      variant='outlined'
      sx={{
        borderColor: bg,
        // backgroundColor: bg,
        '& .MuiChip-label': { color: bg },
        '& .MuiChip-icon': { color: bg },
      }}
    />
  );
};

export default memo(ProductChipCell);
