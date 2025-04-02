'use client';

import { User, UserRequest } from '@/types/users';
import { useCallback } from 'react';
import { createUserAction, updateUserAction } from '@/services/actions/userActions';
import { PageActionsEnum } from '@/types/enums';
import UserFormBody from './UserForm/UserFormBody';
import { userService } from '@/services/userService';
import FormLayout, { FormProps } from '@/components/layout/FormLayout/FormLayout';
import { userSchema } from '@/helpers/schemas';
import { getUserFullname } from '@/helpers/utils';

export type UserDetailsContentProps = {
  initialData?: User;
  id?: string;
  mode: PageActionsEnum;
};
export default function UserDetailsContent({ initialData, mode, id }: UserDetailsContentProps) {
  //TODO: FIX HERE
  //eslint-disable-next-line
  const createNewUser = useCallback(async (data: any) => {
    // logic to format data before sending
    return await createUserAction(data as UserRequest);
  }, []);

  const updateUser = useCallback(
    //eslint-disable-next-line
    async (id: string, data: any) => {
      // logic to format data before sending
      // data.customerId = initialData.customerId;
      return await updateUserAction(id, data);
    },
    [],
  );

  const title =
    mode === PageActionsEnum.CREATE
      ? 'Registrar nuevo usuario'
      : `Detalles del usuario: ${getUserFullname(initialData) || ''}`;

  const formProps: FormProps<User, UserRequest> = {
    schema: userSchema,
    service: userService,
    mapToRequest: (data?: User) => data as UserRequest,
    createRequestAction: createNewUser,
    updateRequestAction: updateUser,
    id,
    initialData,
    title,
  };

  return (
    <FormLayout mode={mode} formProps={formProps}>
      {/* Grid Section */}
      <UserFormBody mode={mode} title={title} />
    </FormLayout>
  );
}
