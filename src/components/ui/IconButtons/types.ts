import { IconButtonProps } from '@mui/material';

export interface IconButtonsProps extends IconButtonProps {
  buttonType?: ButtonTypeEnum;
}

export enum ButtonTypeEnum {
  Default = 'default',
  CellButton = 'cellbutton',
}
