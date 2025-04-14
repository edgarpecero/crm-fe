'use client';

import { CreateInventoryRequest, Inventory, UpdateInventoryRequest } from '@/types/inventory';
import { createInventoryAction, updateInventoryAction } from '@/services/actions/inventoryActions';
import { PageActionsEnum } from '@/types/enums';
import { inventoryService as service } from '@/services/inventoryService';
import FormLayout from '@/components/layout/FormLayout/FormLayout';
import { createInventorySchema, updateInventorySchema } from '@/helpers/schemas';
import InventoryFormBody from './InventoryForm/InventoryFormBody';
import useSubmitData from '@/hooks/useSubmitData';

export type InventoryDetailsContentProps = {
  initialData?: Inventory;
  id?: string;
  mode: PageActionsEnum;
};
export default function InventoryDetailsContent({
  initialData,
  mode,
  id,
}: InventoryDetailsContentProps) {
  const { handleSubmitData } = useSubmitData<
    Inventory,
    CreateInventoryRequest,
    UpdateInventoryRequest
  >({
    id,
    mode,
    createRequestAction: createInventoryAction,
    updateRequestAction: updateInventoryAction,
  });
  const isCreateMode = mode === PageActionsEnum.CREATE;
  const schema = isCreateMode ? createInventorySchema : updateInventorySchema;

  const title =
    mode === PageActionsEnum.CREATE
      ? 'Ingresar nuevo auto'
      : `Datos del auto:  ${initialData?.sku || ''}`;

  const formProps = {
    handleSubmitData,
    initialData,
    id,
    service,
    schema,
    title,
  };

  return (
    <FormLayout mode={mode} formProps={formProps}>
      {/* Grid Section */}
      <InventoryFormBody mode={mode} title={title} />
    </FormLayout>
  );
}
