import { ActionResponse } from '@/services/actions/createApiActions';
import { PageActionsEnum } from '@/types/enums';
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { usePathname, useRouter } from 'next/navigation';
import { BaseEntity } from '@/types/BaseEntity';

/**
 * Hook to handle basic form submission for creating and updating data
 * T - Type of the entity being created/updated
 * C - Type of the create request data
 * U - Type of the update request data
 */

interface UseSubmitDataProps<
  T extends BaseEntity,
  C,
  U,
> {
  id?: string;
  mode: PageActionsEnum;
  createRequestAction?: (data: C) => Promise<ActionResponse<T>>;
  updateRequestAction?: (data: U, id: string) => Promise<ActionResponse<T>>;
}

function useSubmitData<
  T extends BaseEntity,
  C,
  U,
>({
  id,
  mode,
  createRequestAction,
  updateRequestAction,
}: UseSubmitDataProps<T, C, U>) {

  const pathname = usePathname().split('/')[1];
  const router = useRouter();

  const handleSubmitData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: C | U, methods: UseFormReturn<z.TypeOf<any>, any, undefined>) => {
      if (mode === PageActionsEnum.CREATE) {
        const response = await createRequestAction(data as C);
        if (response.success && response.data) {
          alert(response.message);
          methods.reset();
          router.push(`/${pathname}/${response.data.id}`);
        } else if (response.errors) {
          console.log('Errores de validación:', response.errors);
        } else {
          alert(response.message);
        }
      }

      if (mode === PageActionsEnum.UPDATE && id) {
        const response = await updateRequestAction(data as U, id);
        if (response.success && response.data) {
          alert(response.message);
          methods.reset(response.data);
        } else if (response.errors) {
          console.log('Errores de validación:', response.errors);
        } else {
          alert(response.message);
        }
      }
    },
    [mode, createRequestAction, updateRequestAction, id, pathname, router]
  );

  return { handleSubmitData };
}

export default useSubmitData;