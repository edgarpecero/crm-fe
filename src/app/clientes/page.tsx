import CustomersTable from '@/components/features/customers/CustomersTable';
import { customerService } from '@/services/customerService';

export default async function CustomersTablePage() {
  const initialData = await customerService.getAll();

  return <CustomersTable initialData={initialData} />;
}
