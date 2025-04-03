import CustomerDetailsContent from '@/components/features/customers/details/CustomerDetailsContent';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { customerService } from '@/services/customerService';
import { PageActionsEnum } from '@/types/enums';
import { Suspense } from 'react';

export default async function CustomerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const customer = await customerService.getById(id);

  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <CustomerDetailsContent initialData={customer} id={id} mode={PageActionsEnum.UPDATE} />
    </Suspense>
  );
}

