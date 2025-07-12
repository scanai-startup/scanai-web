import z from "zod";

export const signinForm = z.object({
  email: z.email(),
  password: z.string().min(8),
});
