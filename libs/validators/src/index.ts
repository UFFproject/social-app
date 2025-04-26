import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    forename: z
      .string()
      .min(1, 'Forename is required')
      .min(2, 'Forename must be at least 2 characters')
      .max(50, 'Forename must be less than 50 characters')
      .trim()
      .regex(
        /^[a-zA-Z\s\-']+$/,
        'Forename can only contain letters, spaces, hyphens, and apostrophes'
      ),

    surname: z
      .string()
      .min(1, 'Surname is required')
      .min(2, 'Surname must be at least 2 characters')
      .max(50, 'Surname must be less than 50 characters')
      .trim()
      .regex(
        /^[a-zA-Z\s\-']+$/,
        'Surname can only contain letters, spaces, hyphens, and apostrophes'
      ),

    email: z
      .string()
      .min(1, 'Email is required')
      .min(5, 'Email address is too short')
      .max(100, 'Email address is too long')
      .email('Please enter a valid email address')
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character'
      ),

    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

export const editProfileSchema = z
  .object({
    name: z.string(),
    surname: z.string(),
    dateOfBirth: z.coerce.date(),
    gender: z.string(),
    nationality: z.string(),
    fieldOfStudy: z.string(),
    yearOfStudy: z.coerce.number(),
    languages: z.string(),
    relationship: z.string(),
  })
  .partial();

export type EditProfileValues = z.infer<typeof editProfileSchema>;

export const createPostSchema = z.object({
  textContent: z.string().min(5).max(999),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;
