'use client';

import DataGridHeader from '@/components/ui/DataGridWrapper/DataGridHeader';
import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
import { capitalizeFirstLetter } from '@/helpers/utils';
import { Typography } from '@mui/material';
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

  return (
    <>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {pageProps?.title || capitalizeFirstLetter(pathname)}
      </Typography>
      {dataGridHeaderProps && (
        <DataGridHeader {...dataGridHeaderProps} />
      )}
      <DataGridWrapper
        {...dataGridProps}
        loading={pageProps?.isFetching}
      />
    </>
  );
}

export default DataGridLayout;