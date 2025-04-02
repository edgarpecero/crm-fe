'use client';

import { User } from '@/types/users';
import { PageActionsEnum } from '@/types/enums';
import { getUserAddressInputs, getUserInputs } from '@/components/features/orders/helpers';
import TitlePage from '@/components/layout/PageLayout/TitlePage';
import TwoColumnsGrid from '@/components/layout/GridLayouts/TwoColumnsGrid';

type UserFormBodyProps = {
  title?: string;
  initialUser?: User | null;
  mode: PageActionsEnum;
};

export default function UserFormBody({ title, mode }: UserFormBodyProps) {
  return (
    <>
      <TitlePage title={title} />

      <TwoColumnsGrid
        title1='Registro'
        firstColInputs={getUserInputs(mode)}
        secondColInputs={getUserAddressInputs(mode)}
      />
    </>
  );
}
