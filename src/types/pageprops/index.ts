import { DataGridHeaderProps } from "@/components/ui/DataGridWrapper/DataGridHeader";
import { DataGridWrapperProps } from "@/components/ui/DataGridWrapper/DataGridWrapper";
import { UseQueryOptions } from "@tanstack/react-query";


interface PageProps {
  pathname?: string;
  title?: string;
}
interface DetailPageProps<T> extends PageProps {
  entity?: T;
}
type GenericDataGridPageProps<T> = {
  queryProps: UseQueryOptions<T>;
  dataGridProps: DataGridWrapperProps;
  dataGridHeaderProps: DataGridHeaderProps;
  pageProps?: PageProps;
};
interface GenericPageProps<T> {
  queryProps: UseQueryOptions<T>;
  pageProps: DetailPageProps<T>;
}

// interface GenericPageProps<T>
//   extends Omit<GenericDataGridPageProps<T>, "dataGridProps" | "dataGridHeaderProps"> { }

export type {
  GenericDataGridPageProps,
  PageProps,
  GenericPageProps,
  DetailPageProps,
};
