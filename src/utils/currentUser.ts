import z from "zod";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const UserSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
  }),
  token: z.string(),
});
export function getCurrentUser() {
  const headersList = headers();
  const userHeader = headersList.get("x-user");

  if (!userHeader) {
    return null;
  }

  try {
    const user = JSON.parse(userHeader);
    const validatedUserData = UserSchema.parse(user);
    return validatedUserData;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}

export async function signOutCurrentUser() {
  cookies().delete("user-storage");

  redirect("/login");
}
