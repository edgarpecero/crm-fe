'use server';

import { revalidatePath } from 'next/cache';

// Definimos una interfaz para los servicios compatibles
/*
 * T is the type of the entity returned by the API
 * R is the type of the request data sent to the API
 */
export interface ApiService<T, R> {
  create: (data: R) => Promise<T>;
  update: (id: string, data: Partial<R>) => Promise<T>;
  delete: (id: string) => Promise<void>;
  endpoint: string;
}
export interface ActionResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{
    field: string | number;
    message: string;
  }>;
}

export async function createAction<T, R>(service: ApiService<T, R>, data: R): Promise<T> {
  const createdItem = await service.create(data);
  revalidatePath(service.endpoint);
  return createdItem;
}

export async function updateAction<T, R>(
  service: ApiService<T, R>,
  id: string,
  data: Partial<R>,
): Promise<T> {
  const updatedItem = await service.update(id, data);
  revalidatePath(service.endpoint);
  return updatedItem;
}

export async function deleteAction<T, R>(service: ApiService<T, R>, id: string): Promise<void> {
  await service.delete(id);
  revalidatePath(service.endpoint);
  revalidatePath(`${service.endpoint}/${id}`); // Revalidate the specific item page
}
