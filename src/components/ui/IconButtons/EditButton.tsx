import { memo } from "react";
import BaseIconButton, { BaseIconButtonProps } from "./BaseIconButton"
import EditIcon from '@mui/icons-material/Edit';
const EditButton = (props: BaseIconButtonProps) => {
  return (
    <BaseIconButton
      {...props}
      tooltip='Editar'
      icon={<EditIcon />}
    />
  );
};
export default memo(EditButton);
