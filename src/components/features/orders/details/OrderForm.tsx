'use client';

import GridInputs from "@/components/ui/GridInputs/GridInputs";
import { Order } from "@/types/orders";
import { Grid2, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseEntity } from "@/types/BaseEntity";
export enum FormModeEnum {
  CREATE = 'crear',
  READ = 'observar',
  UPDATE = 'editar',
  DELETE = 'eliminar',
}

// interface GenericFormProps<T extends BaseEntity> {
//   entity: T;
//   mode: FormModeEnum;
// }
interface OrderFormProps {
  order: Order;
  mode: FormModeEnum;
}

export default function OrderForm({ order, mode = FormModeEnum.READ }: OrderFormProps) {

  // const methods = useForm<Order>({
  //   resolver: zodResolver(customerSchema),
  //   defaultValues: customer || defaultValuesCustomer,
  //   mode: 'all',
  // });

  // const onSubmit = (data: CusOrderomer) => {
  //   console.log(data);
  // }

  return (
    null
    // <FormProvider {...methods}>
    //   <form onSubmit={methods.handleSubmit(onSubmit)}>
    //     <Typography variant='h4' sx={{ pb: '24px' }}>
    //       Registro
    //     </Typography>
    //     <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
    //       <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
    //         <GridInputs inputs={generalInputs} />
    //       </Grid2>
    //       <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
    //         <GridInputs inputs={addressInputs} />
    //       </Grid2>
    //     </Grid2>
    //     <Typography variant='h4' sx={{ pb: '24px', pt: '24px' }}>
    //       Información adicional
    //     </Typography>
    //     <Grid2 container spacing={6} alignItems='start' justifyContent='space-between'>
    //       <Grid2 container spacing={3} size={{ xs: 12, sm: 6 }}>
    //         <GridInputs inputs={additionalInfoInputs} />
    //       </Grid2>
    //     </Grid2>
    //   </form>
    // </FormProvider>
  )
}