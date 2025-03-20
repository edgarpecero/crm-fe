import OrderDetailsContent from "@/components/features/orders/details/OrderDetailsContent";
import { FormModeEnum } from "@/components/layout/FormData/helpers";
import CircularIndeterminate from "@/components/ui/Progress/CircularIndeterminate";
import { getOrderById } from "@/services/orders";
import { Suspense } from "react";

export default async function OrderDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;

  const queryMode = query.mode as FormModeEnum | undefined;
  const isCreateMode = id === FormModeEnum.CREATE; 
  const mode = isCreateMode ? FormModeEnum.CREATE : queryMode || FormModeEnum.READ;
  const order = !isCreateMode ? await getOrderById(id) : undefined;

  return (
    <Suspense fallback={<CircularIndeterminate />} >
      <OrderDetailsContent initialOrder={order} mode={mode} />
    </Suspense>
  )
}