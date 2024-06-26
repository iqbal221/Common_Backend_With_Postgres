import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User ID is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.string({
      required_error: 'Role is required',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
};
