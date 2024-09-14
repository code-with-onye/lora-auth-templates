import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { SignInSchema } from "@/components/shared/forms/signin-form";
import { SiginIn } from "@/endpoint/user";
import { UserSchema } from "@/schema/user";

import { useUserStore } from "../client/store/useUser";

export const useSignIn = () => {
  const { login } = useUserStore();
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["user_signin"],
    mutationFn: (data: z.infer<typeof SignInSchema>) => SiginIn(data),
    onSuccess: (data: any) => {
      const user: z.infer<typeof UserSchema> = data?.data?.data?.user;
      login({ ...user, token: data?.data?.data?.token });
    },
  });

  return { mutate, isPending, isError, error };
};
