'use client';

import DataGridHeader from '@/components/ui/DataGridWrapper/DataGridHeader';
import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
import { capitalizeFirstLetter } from '@/helpers/utils';
import { usePathname } from 'next/navigation';
import { DataGridHeaderProps } from '@/components/ui/DataGridWrapper/DataGridHeader';
import { DataGridWrapperProps } from '@/components/ui/DataGridWrapper/DataGridWrapper';
import { BaseEntity } from '@/types/BaseEntity';
interface PageProps {
  title?: string;
  error?: Error | null;
  isFetching?: boolean;
}
type DataGridLayoutProps<T extends BaseEntity> = {
  dataGridProps: DataGridWrapperProps<T>;
  dataGridHeaderProps?: DataGridHeaderProps;
  pageProps?: PageProps;
};

function DataGridLayout<T extends BaseEntity>({
  dataGridProps,
  dataGridHeaderProps,
  pageProps,
}: DataGridLayoutProps<T>) {
  const pathname = usePathname()?.split('/').pop();
  const title = pageProps?.title || capitalizeFirstLetter(pathname);
  return (
    <>
      {/* <Typography variant='h2'>{pageProps?.title || capitalizeFirstLetter(pathname)}</Typography> */}
      {dataGridHeaderProps && <DataGridHeader {...dataGridHeaderProps} title={title} />}
      <DataGridWrapper {...dataGridProps} loading={pageProps?.isFetching} />
    </>
  );
}

export default DataGridLayout;
