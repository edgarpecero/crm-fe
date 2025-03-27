import { debounce } from 'lodash';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { getStaleTime } from '@/helpers/utils';

interface FilterParams {
  searchText?: string;
}

export function useQueryData<T>({
  queryKey,
  fetchFn,
  initialData,
  staleTime = getStaleTime(),
}: {
  queryKey: string;
  fetchFn: () => Promise<T>;
  initialData: T;
  staleTime?: number;
}) {
  const [searchText, setSearchText] = useState<string>('');

  const queryProps: UseQueryOptions<T> = {
    queryKey: [queryKey, searchText],
    queryFn: fetchFn,
    initialData,
    staleTime,
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
