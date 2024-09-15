import { z } from "zod";

export const SignUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const UserSchema = z.object({
   user: z.object({
       name: z.string(),
       email: z.string().email(),
   }), 
   token: z.string(),
})