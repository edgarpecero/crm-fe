'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds before data is considered "stale" (outdated)
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Time in milliseconds to keep data in cache after it is no longer in use
      gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime in v4)
      // Number of retries in case of failure
      retry: 2, // Retries 2 times before failing
      // Prevents automatic re-fetching when the component mounts if data is already cached
      refetchOnMount: 'always', // Or 'always' if you prefer to always refresh
      // Prevents re-fetching when switching windows or reconnecting
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      // Number of retries for mutations
      retry: 1, // Only one retry for mutations
    },
  },
});

export default function ClientQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
