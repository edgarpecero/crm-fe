import { replaceNulls } from '@/helpers/utils';
import { apiFetch } from '@/services/config';

export function createApiService<T, ListResponse, R>(endpoint: string) {
  return {
    getAll: async (): Promise<ListResponse> => {
      return apiFetch<ListResponse>(endpoint);
    },
    getById: async (id?: string, queryParams?: Record<string, string>): Promise<T> => {
      const url = queryParams
        ? `${endpoint}/${id}?${new URLSearchParams(queryParams).toString()}`
        : `${endpoint}/${id}`;
        return apiFetch<T>(url);;
    },
    create: async (data: R): Promise<T> => {
      const response = await apiFetch<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return replaceNulls<T>(response);
    },
    update: async (id: string, data: R): Promise<T> => {
      const response = await apiFetch<T>(`${endpoint}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return replaceNulls<T>(response);
    },
    delete: async (id: string): Promise<void> => {
      await apiFetch<void>(`${endpoint}/${id}`, { method: 'DELETE' });
    },
    endpoint,
  };
}

