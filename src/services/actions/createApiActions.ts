'use server';

import { revalidatePath } from 'next/cache';

// Definimos una interfaz para los servicios compatibles
interface ApiService<T> {
  create: (data: T) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
  endpoint: string;
}

type ActionOptions<T> = {
  mapCreateData?: (formData: T) => T;
  mapUpdateData?: (formData: Partial<T>) => Partial<T>;
};

// Creamos las funciones de acción individualmente
export async function createAction<T>(
  service: ApiService<T>,
  data: T,
  options: ActionOptions<T> = {},
): Promise<T> {
  const mappedData = options.mapCreateData ? options.mapCreateData(data) : data;
  const createdItem = await service.create(mappedData);
  revalidatePath(service.endpoint);
  return createdItem;
}

export async function updateAction<T>(
  service: ApiService<T>,
  id: string,
  data: Partial<T>,
  options: ActionOptions<T> = {},
): Promise<T> {
  const mappedData = options.mapUpdateData ? options.mapUpdateData(data) : data;
  const updatedItem = await service.update(id, mappedData);
  revalidatePath(service.endpoint);
  return updatedItem;
}

export async function deleteAction<T>(service: ApiService<T>, id: string): Promise<void> {
  await service.delete(id);
  revalidatePath(service.endpoint);
  revalidatePath(`${service.endpoint}/${id}`); // Revalida la página de detalle
}
