'use client';

import { capitalizeFirstLetter, getStaleTime } from "@/helpers/utils";
import { Order } from "@/types/orders";
import { useRouter } from "next/navigation";
import { createOrderSchema, defaultValues, updateOrderSchema, getUserInputsForOrderRequest, contractInputsSectionOne, contractInputsSectionTwo, CreateOrderSchema, UpdateCustomerSchema, getUserAddressInputsForOrderRequest } from "../helpers";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { createOrder, updateOrder } from "@/services/actions/orders";
import { Box, Button, Grid2, Typography } from "@mui/material";
import GridInputs from "@/components/ui/GridInputs/GridInputs";
import { useQuery } from "@tanstack/react-query";
import { FormModeEnum } from "@/components/layout/FormData/helpers";
import { QueryKeysEnum } from "@/services/config";
import { getOrderById } from "@/services/orders";

type OrderDetailsContentProps = {
  initialOrder?: Order;
  mode: FormModeEnum;
}

type FormData<T extends FormModeEnum> = T extends FormModeEnum.CREATE ? CreateOrderSchema : UpdateCustomerSchema;

export default function OrderDetailsContent({ initialOrder, mode }: OrderDetailsContentProps) {
  const router = useRouter();
  const id = initialOrder?.id;
  const isCreate = mode === FormModeEnum.CREATE;
  const isUpdate = mode === FormModeEnum.UPDATE;
  const isRead = mode === FormModeEnum.READ;

  // Schema dinámico según el modo
  const schema = isCreate ? createOrderSchema : updateOrderSchema;

  // Configuración de React Hook Form
  const methods = useForm<FormData<typeof mode>>({
    resolver: zodResolver(schema),
    defaultValues: initialOrder || defaultValues,
  });
  const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = methods;

  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: [QueryKeysEnum.ORDERS, id],
    queryFn: () => getOrderById(id!),
    initialData: initialOrder || undefined,
    staleTime: getStaleTime(),
    enabled: !!id && (isRead || isUpdate), // Solo fetch si hay ID y es READ o UPDATE
  });

  // Sincronizar datos iniciales
  useEffect(() => {
    if (order) {
      reset(order || initialOrder);
    }
  }, [initialOrder, order, reset]);

  // Manejo del envío del formulario
  const onSubmit = async (data: FormData<typeof mode>) => {
    console.log('data', data);
    if (isUpdate && id) {
      await updateOrder(id, data as Order);
      router.push('/cobranza');
    } else if (isCreate) {
      await createOrder(data as Order);
      router.push('/cobranza');

      // TODO: Implementar lógica para crear una orden si corresponde
      // await createOrder(data as CreateOrderRequest);
      // router.push('/orders');
    }
  };

  // Título dinámico
  const title = isCreate
    ? 'Crea un nuevo contrato'
    : isUpdate
      ? `Editar Orden ${order?.number || id}`
      : `Detalles de la Orden ${order?.number || id}`;

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} id={'contractForm'} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Box sx={{ flex: '1 0 auto' }}>
            <Typography variant='h2' sx={{ mb: 5 }}>
              {title || initialOrder?.number || capitalizeFirstLetter(FormModeEnum.CREATE)}
            </Typography>
            <Typography variant='h4' sx={{ pb: '24px' }}>
              Registro
            </Typography>
            {/* <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}> */}
            <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
              <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }} >
                <GridInputs inputs={getUserInputsForOrderRequest()} />
              </Grid2>
              <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }} >
                <GridInputs inputs={getUserAddressInputsForOrderRequest()} />
              </Grid2>
            </Grid2>
            <Typography variant='h4' sx={{ pb: '24px', pt: '24px' }}>
              Información adicional
            </Typography>
            <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
              <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
                <GridInputs inputs={contractInputsSectionOne} />
              </Grid2>
              <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
                <GridInputs inputs={contractInputsSectionTwo} />
              </Grid2>
            </Grid2>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, mt: 5, flexShrink: 0, }}>
            <Button
              variant='outlined'
              size='large'
              onClick={() => reset()}
              disabled={!isDirty}
            >Cancelar</Button>
            <Button variant='contained' size='large' type='submit'>{isCreate ? 'Crear' : 'Actualizar'}</Button>
          </Box>
        </form>
      </FormProvider >
    </>
  )
}