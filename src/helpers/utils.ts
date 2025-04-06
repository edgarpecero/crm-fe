import { format } from 'date-fns';
import { datePickerFormat } from './constants';
import { GridRowParams } from '@mui/x-data-grid';
import { User } from '@/types/users';

export const filterData = <T>(data: T[], searchInput: string, ...keys: (keyof T)[]): T[] => {
  if (!searchInput) return data; // Return all data if search input is empty

  const lowerCasedSearch = searchInput.toLowerCase();

  return data.filter((item) =>
    keys.some((key) => String(item[key])?.toLowerCase().includes(lowerCasedSearch)),
  );
};

export const getCurrentDate = (): string => {
  const today = new Date();

  const opts: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Mexico_City',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('es-MX', opts).format(today);
};

export const getRowId = (row: GridRowParams) => row.id;

/* FORMATTERS */
export const getUserFullname = (user: User) => `${user.name} ${user.lastName}`;
const extractNumberFromString = (str: string) => {
  // Regular expression to match a number (including decimal numbers)
  const regex = /-?\d+(\.\d+)?/;
  const match = str.match(regex);

  // If a match is found, convert it to a number and return
  // If no match is found, return 0
  return match ? Number(match[0]) : 0;
};

export const formatToPrice = (value?: number | string): string => {
  // Display the price with the "$" symbol added.
  // Use as valueFormatter function for DataGrid.

  if (value === '') return '$0.00';
  if (typeof value === 'string' && value.charAt(0) === '$') return value;
  // Format value as price: "$" + {price with 2 decimal places}
  // (e.g., "$123.45")
  const numValue = typeof value === 'string' ? extractNumberFromString(value) : Number(value) || 0;

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numValue);
};

export const replaceNulls = <T>(obj: T): T => {
  // Caso base: si el objeto entero es null, devolvemos undefined
  if (obj === null) return undefined as T;

  // Casos base: si no es un objeto o es un array, lo devolvemos tal cual
  if (typeof obj !== 'object' || Array.isArray(obj)) return obj;

  //eslint-disable-next-line
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === null) {
      // Inferimos el tipo del valor original usando el tipo de la propiedad
      //eslint-disable-next-line
      const originalValue = (obj as any)[key];
      const valueType = typeof originalValue;

      // Asignamos valores por defecto según el tipo
      if (valueType === 'string') {
        result[key] = '';
      } else if (valueType === 'number') {
        result[key] = 0;
      } else if (valueType === 'boolean') {
        result[key] = false;
      } else {
        // Por defecto, si no podemos inferir el tipo, usamos undefined
        result[key] = undefined;
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recursión para objetos anidados
      result[key] = replaceNulls(value);
    } else {
      // Valor primitivo no null
      result[key] = value;
    }
  }
  return result as T;
};

export const formatUSD = (value?: number | string): string => {
  // Recommended for MUI inputs

  // Format value as price with 2 decimal places
  // (e.g., "123.45")

  if (!value) return '0.00';
  return value.toLocaleString('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatToPercentage = (value?: number | string): string => {
  if (value === '') return '';

  const numValue = typeof value === 'string' ? parseFloat(value) : Number(value) || 0;

  return (numValue * 100).toFixed(0) + '%';
};

export const parseStringToNumber = (value?: string): number => {
  if (!value) return 0;
  return parseFloat(value.replace(/,/g, ''));
};

export const dateFormatter = (value: string | undefined): string => {
  // This fn can be used as a valueFormatter for DataGrid columns
  if (!value) return '';
  const date = new Date(value);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const datetimeFormatter = (value: string | undefined): string => {
  if (!value) return '';

  const date = new Date(value);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${formattedDate} ${hours}:${minutes}`;
};

export const formatToDate = (date?: string | number) => {
  if (!date) return '';

  const formattedDate =
    typeof date === 'number'
      ? format(new Date(date), datePickerFormat)
      : format(new Date(String(date)), datePickerFormat);

  return formattedDate;
};

export const formatToTime = (date?: string) => {
  if (!date) return '';

  const formattedDate = format(new Date(date), 'hh:mm:ss a');

  return formattedDate;
};

export const capitalizeFirstLetter = (text?: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/* VALIDATORS */

/* API - QUERIES */
export const getStaleTime = (minutes: number = 5) => minutes * 60 * 1000; // 5 minutes

/* STRUCTURES */
export const getOptionsFromEnum = <T extends Record<string, string>>(enumObject: T) =>
  (Object.keys(enumObject) as Array<keyof T>).map((key) => ({
    label: enumObject[key],
    value: key,
  }));