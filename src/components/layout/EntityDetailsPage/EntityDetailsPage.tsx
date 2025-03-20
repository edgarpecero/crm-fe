'use client';

import { FormModeEnum } from "@/components/features/orders/details/OrderForm";
import { capitalizeFirstLetter } from "@/helpers/utils";
import { BaseEntity } from "@/types/BaseEntity";
import { GenericPageProps } from "@/types/pageprops";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export default function EntityDetailsPage<T extends BaseEntity>({
  queryProps,
  pageProps,
  children
}: GenericPageProps<T> & PropsWithChildren) {
  const { entity, title } = pageProps;
  const { data, isLoading, error } = useQuery<T>(queryProps);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <Typography variant='h2' sx={{ mb: 2 }}>
        {title || entity?.number || capitalizeFirstLetter(FormModeEnum.CREATE)}
      </Typography>
      {children}
    </>
  );
}