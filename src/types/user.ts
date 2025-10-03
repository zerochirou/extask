import z from 'zod';

export const userSchema = z.object({
  email: z.string().email({ message: 'email is invalid!' }),
  password: z
    .string()
    .min(4, { message: 'password is less than 4 character!' }),
});
