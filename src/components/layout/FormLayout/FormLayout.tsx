'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';
import { PageActionsEnum } from '@/types/enums';
import { BaseEntity } from '@/types/BaseEntity';
import { z } from 'zod';
import FormFooterLayout from './FormFooterLayout';

/**
 * FormLayout component
 * @param {PageActionsEnum} mode - The mode of the form (CREATE, UPDATE, READONLY, MODALREADONLY)
 * @param {React.ReactNode} children - The form fields and other components
 * @param {FormProps} formProps - The form properties including schema, service, and other options
 * @returns {JSX.Element} - The rendered form layout
 */

interface ApiService<T> {
  getById(id: string): Promise<T>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormProps<T extends BaseEntity, S extends z.ZodType<any, any, any>> {
  schema: S;
  service: ApiService<T>;
  handleSubmitData?: (
    data: z.infer<S>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    methods: UseFormReturn<z.TypeOf<S>, any, undefined>,
  ) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapToRequest?: (data?: any) => any;
  id?: string;
  initialData?: T;
  title: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormLayoutProps<T extends BaseEntity, S extends z.ZodType<any, any, any>> {
  mode: PageActionsEnum;
  children: React.ReactNode;
  formProps: FormProps<T, S>;
}

export default function FormLayoutFormLayout<
  T extends BaseEntity,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  S extends z.ZodType<any, any, any>,
>({ mode, children, formProps }: FormLayoutProps<T, S>) {
  const { schema, id, initialData, service, mapToRequest, handleSubmitData } = formProps || {};
  const readonly = mode === PageActionsEnum.READONLY;
  const modalReadonly = mode === PageActionsEnum.MODALREADONLY;
  const defaultValues = mapToRequest ? mapToRequest(initialData) : initialData;
  const [isPending, startTransition] = useTransition();
  const methods = useForm<z.infer<S>>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues,
  });

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

  const onSubmit = useCallback(
    async (data: z.infer<S>) => {
      startTransition(async () => {
        handleSubmitData(data, methods);
      });
    },
    [startTransition, methods, handleSubmitData],
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
          onSubmit={methods.handleSubmit(onSubmit)}
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
export interface FormBodyProps {
  defaultExpanded?: boolean;
  parentName?: string;
  required?: boolean;
  disbled?: boolean;
  mode: PageActionsEnum;
  title?: string;
}
const FormContext = createContext<FormContextType | undefined>(undefined);
export function useFormLayout() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormLayout must be used within a FormContextProvider');
  }
  return context;
}
