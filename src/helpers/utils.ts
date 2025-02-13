import { format } from 'date-fns';
import { datePickerFormat } from './constants';

export const filterData = <T>(data: T[], searchInput: string, ...keys: (keyof T)[]): T[] => {
  if (!searchInput) return data; // Return all data if search input is empty

  const lowerCasedSearch = searchInput.toLowerCase();

  return data.filter((item) =>
    keys.some((key) => String(item[key])?.toLowerCase().includes(lowerCasedSearch)),
  );
};

/* FORMATTERS */
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

//eslint-disable-next-line
export const removeNullFields = (obj: Record<string, any>) =>
  Object.entries(obj)
    //eslint-disable-next-line
    .filter(([_, v]) => v != null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

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

/* VALIDATORS */
