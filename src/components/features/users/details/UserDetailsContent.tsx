'use client';

import { CreateUserRequest, User, UserRequest } from '@/types/users';
import { useEffect, useMemo, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { createUserAction, updateUserAction } from '@/services/actions/userActions';
import { PageModeEnum } from '@/types/enums';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/userService';
import { getTabContentStyle } from '@/components/layout/InnerPageTabs/helpers';
import UserFormBody from './UserForm/UserFormBody';
import UserFormFooter from './UserForm/UserFormFooter';
import { userSchema } from '../../orders/helpers';

export type UserDetailsContentProps = {
  initialData?: User;
  mode: PageModeEnum;
  userId?: string;
};
export default function UserDetailsContent({ initialData, mode, userId }: UserDetailsContentProps) {
  const [isPending, startTransition] = useTransition();
  const readonly = mode === PageModeEnum.READONLY;
  const router = useRouter();
  const methods = useForm<UserRequest>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData,
  });

  const wrapperStyles = useMemo(() => getTabContentStyle(true), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await userService.getById(initialData?.id);
        methods.reset(resp);
        return resp;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (initialData?.id) {
      fetchData();
    }
  }, [initialData?.id, methods]);

  const title =
    mode === PageModeEnum.CREATE
      ? 'Crea un nuevo contrato'
      : `Detalles de la Orden ${initialData?.number || userId || ''}`;

  //TODO: FIX HERE
  //eslint-disable-next-line
  const handleSubmitUser = async (data: any) => {
    startTransition(async () => {
      if (mode === PageModeEnum.UPDATE && initialData?.id) {
        // data.customerId = initialData.customerId;
        // Edit mode: Call updateUserAction
        const result = await updateUserAction(initialData.id, data);
        if (result) {
          alert('Usuario actualizada exitosamente');
          methods.reset(result); // Reset form with updated data
        } else {
          alert('Error al actualizar el usuario');
        }
      } else if (mode === PageModeEnum.CREATE) {
        // Create mode: Call createUserAction
        // data.lastModifiedBy = 'Admin';
        // data.userName = 'Admin';
        // data.itemId = 'Admin';
        // data.itemName = 'Toyota Prius 2021';
        // data.userId = 'd7252b8e-124d-49d2-8fc1-bbf03a051d0f';
        // data.customer.lastModifiedBy = 'Admin';
        // data.customer.lastModifiedBy = 'Admin';
        data.lastModifiedBy = 'Admin';
        data.username = 'Admin';
        console.log('result', data);
        const result = await createUserAction(data as CreateUserRequest);
        if (result.success && result.data) {
          alert(result.message);
          methods.reset();
          router.push(`/usuarios`);
        } else if (result.errors) {
          console.log('Errores de validación:', result.errors);
        } else {
          alert(result.message);
        }
      }
    });
  };
  return (
    <Box sx={wrapperStyles}>
      {!readonly && (
        <Typography variant='h2' sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmitUser)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <div
            style={{
              width: readonly ? '100%' : '80%',
              height: '100%', // Takes full height of the form
              display: 'flex',
              flexDirection: 'column', // Maintains column layout for content
              justifyContent: 'center', // Centers content vertically
              alignItems: 'center', // Centers content horizontally
            }}
          >
            {/* Grid Section */}
            <UserFormBody mode={mode} />

            {/* Button Section */}
          </div>
          {!readonly && <UserFormFooter mode={mode} modalView={false} isPending={isPending} />}
        </form>
      </FormProvider>
    </Box>
  );
}
