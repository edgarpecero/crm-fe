import { IconButtonProps, SxProps, Theme } from '@mui/material';
import { ButtonTypeEnum, IconButtonsProps } from './types';

export const defaultButtonStyles: SxProps<Theme> = {
  width: 40,
  height: 40,
  mb: '20px',
  '& img': {
    width: '18px',
    height: '18px',
  },
};

export const cellIconButtonStyles: SxProps<Theme> = { minWidth: '30px', minHeight: '30px' };

export const sizePropMap: Record<ButtonTypeEnum, string> = {
  [ButtonTypeEnum.Default]: 'large',
  [ButtonTypeEnum.CellButton]: 'small',
};

export const buttonStylesMap: Record<ButtonTypeEnum, SxProps<Theme>> = {
  [ButtonTypeEnum.Default]: defaultButtonStyles,
  [ButtonTypeEnum.CellButton]: cellIconButtonStyles,
};

export const getIconButtonsProps = (props: IconButtonsProps) => {
  const { buttonType = ButtonTypeEnum.Default, sx, ...rest } = props;

  const styles = { ...buttonStylesMap[buttonType], ...(sx || {}) };
  const size = sizePropMap[buttonType];

  return {
    sx: styles,
    size,
    ...rest,
  } as IconButtonProps;
};
