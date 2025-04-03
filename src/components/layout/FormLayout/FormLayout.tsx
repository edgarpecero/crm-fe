'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { PageActionsEnum } from '@/types/enums';
import { BaseEntity } from '@/types/BaseEntity';
import { ZodType } from 'zod';
import FormFooterLayout from './FormFooterLayout';
import { ActionResponse } from '@/services/actions/createApiActions';
import { usePathname, useRouter } from 'next/navigation';

interface ApiService<T> {
  getById(id: string): Promise<T>;
}
export interface FormProps<T, R> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any | ZodType<R>;
  service: ApiService<T>;
  createRequestAction?: (data: R) => Promise<ActionResponse<T>>;
  updateRequestAction: (id: string, data: R) => Promise<ActionResponse<T>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapToRequest?: (data?: any) => any;
  id?: string;
  initialData?: T;
  title: string;
}
export interface FormLayoutProps<T extends BaseEntity, R extends FieldValues> {
  mode: PageActionsEnum;
  children: React.ReactNode;
  formProps: FormProps<T, R>;
}

export default function FormLayout<T extends BaseEntity, R extends FieldValues>({
  mode,
  children,
  formProps,
}: FormLayoutProps<T, R>) {
  const {
    schema,
    id,
    initialData,
    service,
    mapToRequest,
    createRequestAction,
    updateRequestAction,
  } = formProps || {};
  const readonly = mode === PageActionsEnum.READONLY;
  const modalReadonly = mode === PageActionsEnum.MODALREADONLY;
  const defaultValues = mapToRequest ? mapToRequest(initialData) : initialData;
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname().split('/')[1];
  const router = useRouter();
  const methods = useForm<R>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  console.log(initialData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.getById(id);
        //eslint-disable-next-line
        methods.reset(data as any);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (modalReadonly && id) {
      fetchData();
    }
    //eslint-disable-next-line
  }, []);


  const handleSubmitOrder = useCallback(
    async (data: R) => {
      startTransition(async () => {
        if (mode === PageActionsEnum.CREATE && createRequestAction) {
          console.log('Data:', data);
          const response = await createRequestAction(data as R);
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
          const response = await updateRequestAction(id, data as R);
          if (response.success && response.data) {
            alert(response.message);
            //eslint-disable-next-line
            methods.reset(response.data as any);
          } else if (response.errors) {
            console.log('Errores de validación:', response.errors);
          } else {
            alert(response.message);
          }
        }
      });
    },
    [
      startTransition,
      mode,
      methods,
      id,
      createRequestAction,
      updateRequestAction,
      router,
      pathname,
    ],
  );
  const contextValue = useMemo(() => ({ isPending, mode }), [isPending, mode]);
  return (
    <Box
      id={'form-container'}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmitOrder)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: modalReadonly ? '100%' : '70%',
          }}
        >
          <FormContext.Provider value={contextValue}>
            {children}
            {!readonly && !modalReadonly && <FormFooterLayout />}
          </FormContext.Provider>
        </form>
      </FormProvider>
    </Box>
  );
}

// Define the context type
interface FormContextType {
  isPending: boolean;
  mode: PageActionsEnum;
}
const FormContext = createContext<FormContextType | undefined>(undefined);
export function useFormLayout() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormLayout must be used within a FormContextProvider');
  }
  return context;
}
