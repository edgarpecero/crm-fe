'use client';

import DataGridHeader from '@/components/ui/DataGridWrapper/DataGridHeader';
import DataGridWrapper from '@/components/ui/DataGridWrapper/DataGridWrapper';
import { capitalizeFirstLetter } from '@/helpers/utils';
import { Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { DataGridHeaderProps } from '@/components/ui/DataGridWrapper/DataGridHeader';
import { DataGridWrapperProps } from '@/components/ui/DataGridWrapper/DataGridWrapper';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';

interface PageProps {
  title?: string;
  error?: Error | null;
  isLoading?: boolean;
}
type DataGridLayoutProps<T> = {
  dataGridProps: DataGridWrapperProps;
  dataGridHeaderProps?: DataGridHeaderProps;
  pageProps?: PageProps;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function DataGridLayout<TData>({
  dataGridProps,
  dataGridHeaderProps,
  pageProps,
}: DataGridLayoutProps<TData>) {
  const pathname = usePathname()?.split('/').pop();

  if (pageProps?.isLoading) return <CircularIndeterminate />;
  if (pageProps?.error) return <div>Error: {pageProps?.error?.message}</div>;

  return (
    <>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {pageProps?.title || capitalizeFirstLetter(pathname)}
      </Typography>
      {dataGridHeaderProps && (
        <DataGridHeader {...dataGridHeaderProps} />
      )}
      <DataGridWrapper {...dataGridProps} />
    </>
  );
}
