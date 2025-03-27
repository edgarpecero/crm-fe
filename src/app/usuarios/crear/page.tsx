import UserDetailsContent from '@/components/features/users/details/UserDetailsContent';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { PageModeEnum } from '@/types/enums';
import { Suspense } from 'react';

export default async function UserDetailsPage() {
  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <UserDetailsContent mode={PageModeEnum.CREATE} />
    </Suspense>
  );
}
