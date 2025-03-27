import UsersTable from '@/components/features/users/UsersTable';
import { userService } from '@/services/userService';

export default async function UsersTablePage() {
  const initialData = await userService.getAll();

  return <UsersTable initialData={initialData} />;
}
