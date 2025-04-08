import { EntityTypeEnum } from '@/types/BaseEntity';

const currentUrl = window.location.href;
const isLocalhost = currentUrl.includes('localhost');
const API_BASE_URL = isLocalhost
  ? process.env.NEXT_PUBLIC_API_URL_LOCAL
  : process.env.NEXT_PUBLIC_API_URL; 

const defaultHeaders = {
  'Content-Type': 'application/json',
  // Placeholder para autenticación (ej. token desde cookies o localStorage en cliente)
  ...(process.env.NEXT_PUBLIC_API_TOKEN && {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  }),
};

export const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export enum QueryKeysEnum {
  ORDERS = `${EntityTypeEnum.ORDER}s`,
  CUSTOMERS = `${EntityTypeEnum.CUSTOMER}s`,
  INVENTORY = 'inventory',
  USERS = `${EntityTypeEnum.USER}s`,
}
