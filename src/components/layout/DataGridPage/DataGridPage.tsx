'use client';

import DataGridHeader, { DataGridHeaderProps } from "@/components/ui/DataGridWrapper/DataGridHeader";
import DataGridWrapper, { DataGridWrapperProps } from "@/components/ui/DataGridWrapper/DataGridWrapper";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type GenericDataGridPageProps<TData> = {
  queryProps: UseQueryOptions<TData>;
  dataGridProps: DataGridWrapperProps;
  dataGridHeaderProps: DataGridHeaderProps;
};

export default function GenericDataGridPage<TData>({
  queryProps,
  dataGridProps,
  dataGridHeaderProps
}: GenericDataGridPageProps<TData>) {
  const { data, isLoading, error } = useQuery<TData>(queryProps);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <DataGridHeader {...dataGridHeaderProps} />
      <DataGridWrapper {...dataGridProps} rowData={data} />
    </>
  );
}