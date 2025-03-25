import { debounce } from 'lodash';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { getStaleTime } from '@/helpers/utils';

interface FilterParams {
  searchText?: string;
}

export function useQueryDataGrid<T>({
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
  //TODO: Add filter logic
  // // Debounce para la búsqueda
  // const debouncedFetch = useMemo(
  //   () =>
  //     debounce((params: FilterParams) => fetchFn(params), 500),
  //   [fetchFn]
  // );

  // const queryFn = (): Promise<T> => {
  //   const result = debouncedFetch({ searchText });
  //   // Si por alguna razón debouncedFetch devuelve undefined, usamos fetchFn directamente
  //   return result ?? fetchFn({ searchText });
  // };

  const queryProps: UseQueryOptions<T> = {
    queryKey: [queryKey, searchText], // Incluimos searchText en la queryKey para que se refresque
    queryFn: fetchFn,
    // initialData: !searchText ? initialData : undefined, // Solo usamos initialData sin búsqueda
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