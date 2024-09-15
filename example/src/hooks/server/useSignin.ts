import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { useUserStore } from "../client/useSignIn";
import { SignUserSchema, UserSchema } from "@/schema";
import axios from "@/utils/axios";

export const useSignIn = () => {
  const { login } = useUserStore();
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["user_signin"],
    mutationFn: (data: z.infer<typeof SignUserSchema>) =>
      axios.post("/user/signin", data),
    onSuccess: (data: any) => {
      const user: z.infer<typeof UserSchema> = data?.data?.data?.user;
      login({ ...user, token: data?.data?.data?.token });
    },
  });

  return { mutate, isPending, isError, error };
};
