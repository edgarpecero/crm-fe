'use client';

import { Inventory, InventoryRequest } from '@/types/inventory';
import { useCallback } from 'react';
import { createInventoryAction, updateInventoryAction } from '@/services/actions/inventoryActions';
import { PageActionsEnum } from '@/types/enums';
import { inventoryService } from '@/services/inventoryService';
import FormLayout, { FormProps } from '@/components/layout/FormLayout/FormLayout';
import { inventorySchema } from '@/helpers/schemas';
import InventoryFormBody from './InventoryForm/InventoryFormBody';

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
  //TODO: FIX HERE
  //eslint-disable-next-line
  const createNewInventory = useCallback(async (data: any) => {
    // logic to format data before sending
    return await createInventoryAction(data as InventoryRequest);
  }, []);

  const updateInventory = useCallback(
    //eslint-disable-next-line
    async (id: string, data: any) => {
      // logic to format data before sending
      // data.inventoryId = initialData.inventoryId;
      return await updateInventoryAction(id, data);
    },
    [],
  );

  const title =
    mode === PageActionsEnum.CREATE
      ? 'Ingresar nuevo auto'
      : `Detalles del auto:  ${initialData?.sku || ''}`;

  const formProps: FormProps<Inventory, InventoryRequest> = {
    schema: inventorySchema,
    service: inventoryService,
    // mapToRequest: (data?: Inventory) => data as InventoryRequest,
    createRequestAction: createNewInventory,
    updateRequestAction: updateInventory,
    id,
    initialData,
    title,
  };

  return (
    <FormLayout mode={mode} formProps={formProps}>
      {/* Grid Section */}
      <InventoryFormBody mode={mode} title={title} />
    </FormLayout>
  );
}
