import UserDetailsContent from '@/components/features/users/details/UserDetailsContent';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { userService } from '@/services/userService';
import { PageActionsEnum } from '@/types/enums';
import { Suspense } from 'react';

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const user = await userService.getById(id);

  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <UserDetailsContent initialData={user} id={id} mode={PageActionsEnum.UPDATE} />
    </Suspense>
  );
}
