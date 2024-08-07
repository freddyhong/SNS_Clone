"use server";
import { z } from "zod";

const passwordRegex = new RegExp(/^(?=.*\d).+$/);
z;

const formSchema = z.object({
  username: z.string().min(5, "Username should be at least 5 characters long"),
  email: z
    .string()
    .email()
    .endsWith("zod.com", "Only @zod.com emails are allowed"),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long")
    .regex(passwordRegex, "Password should contain at least on number"),
});

export async function handleform(prevState: string, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  //console.log(result.success);
  return {
    logined: result.success,
    ...result.error?.flatten(),
  };
}
