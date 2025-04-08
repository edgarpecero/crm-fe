import { replaceNulls } from '@/helpers/utils';
import { apiFetch } from '@/services/config';
import { BaseEntity } from '@/types/BaseEntity';

/**
 * T - Type of the entity returned
 * ListResponse - Type of the list response
 * C - Type of the create request data
 * U - Type of the update request data
 */

export function createApiService<T extends BaseEntity, ListResponse, C, U>(endpoint: string) {
  return {
    getAll: async (): Promise<ListResponse> => {
      return apiFetch<ListResponse>(endpoint);
    },
    getById: async (id?: string, queryParams?: Record<string, string>): Promise<T> => {
      const url = queryParams
        ? `${endpoint}/${id}?${new URLSearchParams(queryParams).toString()}`
        : `${endpoint}/${id}`;
      return apiFetch<T>(url);
    },
    create: async (data: C): Promise<T> => {
      const response = await apiFetch<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return replaceNulls<T>(response);
    },
    update: async (id: string, data: U): Promise<T> => {
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
