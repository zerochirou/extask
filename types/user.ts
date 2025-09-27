import z from "zod";

export const UserSchema = z.object({
  email: z.email({ message: "email is not valid!" }),
  password: z.string().min(4, { message: "password is not valid!" }),
});
