import { z } from 'zod';
import { errorMessages, regexUsername } from '@/helpers/constants';
import { Customer } from '@/components/features/customer/types';

export const customerSchema = z.object({
  name: z.string().regex(regexUsername, errorMessages.noWhitespaceOrSpecialCharacters),
  lastName: z.string().regex(regexUsername, errorMessages.noWhitespaceOrSpecialCharacters),
  email: z.string().email(errorMessages.validEmailRequired),
  phonePrimary: z.string(),
  phoneSecondary: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z
    .string()
    .min(5, errorMessages.validZipCodeRequired)
    .max(5, errorMessages.validZipCodeRequired)
    .refine((value) => value === '' || value === '-' || /^[0-9]+$/.test(value), {
      message: errorMessages.validZipCodeRequired,
    })
    .or(z.literal('-')), // For handling "-"
  birthday: z.date(),
  nationalId: z.string(),
  licenseNumber: z.string(),
  licenseExpiration: z.date(),
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
  birthday: '',
  nationalId: '',
  licenseNumber: '',
  licenseExpiration: '',
  notes: '',
};
