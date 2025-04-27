import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1).optional(),
  surname: z.string().min(2).optional(),
  dateOfBirth: z.date().optional(),
  gender: z.string().optional(),
  nationality: z.string().min(3).optional(),
  fieldOfStudy: z.string().min(3).optional(),
  yearOfStudy: z.number().min(1).max(5).optional(),
  languages: z.string().min(3).optional(),
  relationships: z.string().min(3).optional(),
});
