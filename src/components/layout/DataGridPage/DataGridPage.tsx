'use client';

import DataGridHeader from "@/components/ui/DataGridWrapper/DataGridHeader";
import DataGridWrapper from "@/components/ui/DataGridWrapper/DataGridWrapper";
import { processPageProps } from "@/helpers/utils";
import { GenericDataGridPageProps } from "@/types/pageprops";
import { Typography } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from "react";

export default function DataGridPage<TData>({
  queryProps,
  dataGridProps,
  dataGridHeaderProps,
  pageProps,
}: GenericDataGridPageProps<TData>) {
  const router = useRouter();
  const currPathname = usePathname()?.split('/').pop();
  const { pathname, title } = processPageProps(queryProps, pageProps, currPathname);
  const { data, isLoading, error } = useQuery<TData>(queryProps);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  const handleRowDoubleClick = useCallback(
    ({ row }: GridRowParams) => {
      router.push(`/${pathname}/${row.id}`);
    },
    [router, pathname],
  );

  return (
    <>
      <Typography variant='h2' sx={{ mb: 2 }}>
        {title}
      </Typography>
      <DataGridHeader {...dataGridHeaderProps} />
      <DataGridWrapper
        {...dataGridProps}
        rowData={data}
        onRowDoubleClick={handleRowDoubleClick}
      />
    </>
  );
}