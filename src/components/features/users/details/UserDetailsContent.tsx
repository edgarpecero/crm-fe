'use client';

import { UpdateUserRequest, User, CreateUserRequest } from '@/types/users';
import { createUserAction, updateUserAction } from '@/services/actions/userActions';
import { PageActionsEnum } from '@/types/enums';
import UserFormBody from './UserForm/UserFormBody';
import { userService as service } from '@/services/userService';
import FormLayout from '@/components/layout/FormLayout/FormLayout';
import { createUserSchema, updateUserSchema } from '@/helpers/schemas';
import { getUserFullname } from '@/helpers/utils';
import useSubmitData from '@/hooks/useSubmitData';
import { createUserDefaultValues } from '../../orders/helpers';

interface UserDetailsContentProps {
  initialData?: User;
  id?: string;
  mode: PageActionsEnum;
}
export default function UserDetailsContent({ initialData, mode, id }: UserDetailsContentProps) {
  const { handleSubmitData } = useSubmitData<User, CreateUserRequest, UpdateUserRequest>({
    id,
    mode,
    createRequestAction: createUserAction,
    updateRequestAction: updateUserAction,
  });

  const isCreateMode = mode === PageActionsEnum.CREATE;
  const schema = isCreateMode ? createUserSchema : updateUserSchema;
  const title = isCreateMode
    ? 'Registrar nuevo usuario'
    : `Detalles del usuario: ${getUserFullname(initialData) || ''}`;

  const formProps = {
    handleSubmitData,
    initialData: isCreateMode ? createUserDefaultValues : initialData,
    id,
    service,
    schema,
    title,
  };

  return (
    <FormLayout mode={mode} formProps={formProps}>
      {/* Grid Section */}
      <UserFormBody mode={mode} title={title} />
    </FormLayout>
  );
}
