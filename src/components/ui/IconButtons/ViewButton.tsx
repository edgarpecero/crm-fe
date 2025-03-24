import { memo } from "react";
import BaseIconButton, { BaseIconButtonProps } from "./BaseIconButton"
import VisibilityIcon from '@mui/icons-material/Visibility';
const ViewButton = (props: BaseIconButtonProps) => {
  return (
    <BaseIconButton
      {...props}
      tooltip='Ver'
      icon={<VisibilityIcon />}
      color='info'
    />
  );
};

export default memo(ViewButton);
