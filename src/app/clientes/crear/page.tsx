import CustomerDetailsContent from '@/components/features/customers/details/CustomerDetailsContent';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { PageActionsEnum } from '@/types/enums';
import { Suspense } from 'react';

export default async function CustomerDetailsPage() {
  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <CustomerDetailsContent mode={PageActionsEnum.CREATE} />
    </Suspense>
  );
}
