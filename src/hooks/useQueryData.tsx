import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useState } from 'react';
import { getStaleTime } from '@/helpers/utils';

export function useQueryData<T>({
  queryKey,
  fetchFn,
  initialData,
  staleTime = getStaleTime(),
  enable = true,
}: {
  // TODO: Change to String[]
  queryKey: string;
  fetchFn: () => Promise<T>;
  initialData?: T;
  staleTime?: number;
  enable?: boolean;
}) {
  const [searchText, setSearchText] = useState<string>('');

  const queryProps: UseQueryOptions<T> = {
    queryKey: [queryKey, searchText],
    queryFn: fetchFn,
    initialData,
    staleTime,
    enabled: enable,
  };

  const { data, isFetching, error, refetch } = useQuery(queryProps);

  // Handler para la búsqueda
  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  return {
    data,
    isFetching,
    error,
    refetch,
    searchText,
    handleSearch,
  };
}
