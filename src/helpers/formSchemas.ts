import { z } from 'zod';
import { errorMessages } from '@/helpers/constants';
import { Customer } from '@/components/features/customer/types';

export const customerSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(errorMessages.validEmailRequired),
  phonePrimary: z.string(),
  phoneSecondary: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip: z
    .string()
    .min(5, errorMessages.validZipCodeRequired)
    .max(5, errorMessages.validZipCodeRequired)
    .refine((value) => value === '' || value === '-' || /^[0-9]+$/.test(value), {
      message: errorMessages.validZipCodeRequired,
    })
    .or(z.literal('-')), // For handling "-"
  birthdate: z.string(),
  nationalId: z.string(),
  licenseNumber: z.string(),
  licenseExpiration: z.string(),
});

export const defaultValuesCustomer: Partial<Customer> = {
  name: '',
  lastName: '',
  email: '',
  phonePrimary: '',
  phoneSecondary: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  birthdate: '',
  nationalId: '',
  licenseNumber: '',
  licenseExpiration: '',
  notes: '',
};
