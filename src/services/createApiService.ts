import { apiFetch } from '@/services/config';

export function createApiService<T, ListResponse>(endpoint: string) {
  return {
    getAll: async (): Promise<ListResponse> => {
      return apiFetch<ListResponse>(endpoint);
    },
    getById: async (id: string, queryParams?: Record<string, string>): Promise<T> => {
      const url = queryParams
        ? `${endpoint}/${id}?${new URLSearchParams(queryParams).toString()}`
        : `${endpoint}/${id}`;
      return apiFetch<T>(url);
    },
    create: async (data: T): Promise<T> => {
      return apiFetch<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    update: async (id: string, data: Partial<T>): Promise<T> => {
      return apiFetch<T>(`${endpoint}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    delete: async (id: string): Promise<void> => {
      await apiFetch<void>(`${endpoint}/${id}`, { method: 'DELETE' });
    },
    endpoint,
  };
}