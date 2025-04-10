'use client';

import { ListUsersResponse, User } from '@/types/users';
import { PageActionsEnum } from '@/types/enums';
import {
  getUserAddressRequestInputs,
  getUserRequestInputs,
} from '@/components/features/orders/helpers';
import TitlePage from '@/components/layout/PageLayout/TitlePage';
import TwoColumnsGrid from '@/components/layout/GridLayouts/TwoColumnsGrid';
import { useQueryData } from '@/hooks/useQueryData';
import { QueryKeysEnum } from '@/services/config';
import { userService } from '@/services/userService';
import { useFormContext } from 'react-hook-form';
import { useEffect, useMemo } from 'react';

type UserFormBodyProps = {
  title?: string;
  initialUser?: User | null;
  mode: PageActionsEnum;
};

export default function UserFormBody({ title, mode }: UserFormBodyProps) {
  const { watch, setValue } = useFormContext();
  // const employeeType = watch('employeeType');
  const employeeLeaderId = watch('employeeLeaderId');
  const employeeManagerId = watch('employeeManagerId');
  // const dynamicDisable = employeeType === 'Seller';
  const userDataQuery = useQueryData<ListUsersResponse>({
    queryKey: QueryKeysEnum.USERS,
    fetchFn: () => userService.getAll(),
  });
  const users = useMemo(() => userDataQuery.data?.users || [], [userDataQuery.data]);

  useEffect(() => {
    const fields = [
      { id: employeeLeaderId, key: 'employeeLeader' },
      { id: employeeManagerId, key: 'employeeManager' },
    ];

    fields.forEach(({ id, key }) => {
      if (id) {
        const fullName = users.find((user) => user.id === id)?.name;
        setValue(key, fullName, { shouldValidate: true });
      }
    });
  }, [employeeLeaderId, employeeManagerId, setValue, users]);

  return (
    <>
      <TitlePage title={title} />

      <TwoColumnsGrid
        title1='Registro'
        firstColInputs={getUserRequestInputs(mode, users)}
        secondColInputs={getUserAddressRequestInputs(mode, users)}
      />
    </>
  );
}
