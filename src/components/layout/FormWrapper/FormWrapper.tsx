'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import InnerPageTabs from '@/components/layout/InnerPageTabs/InnerPageTabs';
import { enumToTabsArray } from '@/components/layout/InnerPageTabs/helpers';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
import { PageModeEnum } from '@/types/enums';
import { BaseEntity } from '@/types/BaseEntity';
import { ZodType } from 'zod';
export enum OrdersTabsEnum {
  Details = 'General',
  Payments = 'Pagos',
}

interface FormWrapperProps<T extends BaseEntity, R extends FieldValues> {
  initialData?: T;
  mode: PageModeEnum;
  children: React.ReactNode;
  formProps: {
    schema: ZodType<R>;
    mapToRequest: (data?: T) => DefaultValues<R>;
    onSubmit: (data: R) => void;
    title?: string;
  };
}

export default function FormWrapper<T extends BaseEntity, R extends FieldValues>({
  initialData,
  mode,
  children,
  formProps,
}: FormWrapperProps<T, R>) {
  const { schema, mapToRequest, onSubmit, title } = formProps;
  const defaultValues = mapToRequest(initialData);
  const [isPending, startTransition] = useTransition();
  const methods = useForm<R>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      methods.reset(defaultValues);
    }
  }, [initialData, methods, defaultValues]);

  const handleSubmitOrder = useCallback(
    async (data: R) => {
      startTransition(async () => {
        onSubmit(data);
      });
    },
    [onSubmit, startTransition],
  );

  const contextValue = useMemo(() => ({ isPending, mode }), [isPending, mode]);
  return (
    <>
      {title && (
        <Typography variant='h2' sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <InnerPageTabs tabsArray={enumToTabsArray(OrdersTabsEnum)} id={TabsIdentifierEnum.ordersTab}>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmitOrder)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
          </form>
        </FormProvider>
      </InnerPageTabs>
    </>
  );
}

// Define the context type
interface FormContextType {
  isPending: boolean;
  mode: PageModeEnum;
}
const FormContext = createContext<FormContextType | undefined>(undefined);
export function useFormWrapper() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormWrapper must be used within a FormContextProvider');
  }
  return context;
}
