import * as z from 'zod';

export const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  surname: z
    .string()
    .min(2, { message: 'Surname is required' }),
  birth_date: z.date({
    required_error: 'Birth date is required',
  }),
  gender: z.string().min(1, 'Gender is required'),
  itra_code: z.string({
    required_error: 'ITRA code is required',
  }),
  team_name: z.string({
    required_error: 'Team name is required',
  }),
  country_id: z.string({
    required_error: 'Country is required',
  }),
  email: z
    .string()
    .email({ message: 'Invalid email address' }),
  phone: z
    .string()
    .min(9, { message: 'Phone number is required' }),
  distance_id: z.string({
    required_error: 'Distance is required',
  }),
  logistics: z.enum(['yes', 'no']),
  tent_rental: z.enum(['yes', 'no']),
  donation_amount: z
    .number()
    .min(0, {
      message: 'Donation amount cannot be negative',
    })
    .optional(),
  race_number: z.string().optional(),
  promo_code: z.string().optional(),
  terms_accepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export type FormValues = z.infer<typeof formSchema>;
