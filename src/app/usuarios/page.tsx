import OrdersTable from '@/components/features/orders/OrdersTable';
import UsersTable from '@/components/features/users/UsersTable';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { getAllUsers } from '@/services/user';
import { Suspense } from 'react';

export default async function OrdersTablePage() {
  const initialUsers = await getAllUsers();

  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <UsersTable initialUsers={initialUsers} />
    </Suspense>
  );
}
