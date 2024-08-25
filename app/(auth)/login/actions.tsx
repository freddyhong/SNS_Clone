"use server";
import db from "../../../lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "../../../lib/session";
import { redirect } from "next/navigation";

const passwordRegex = new RegExp(/^(?=.*\d).+$/);
z;
const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      checkEmailExists,
      "An account with this email does not exist. Please create an account first."
    ),

  password: z
    .string()
    .min(10, "Password should be at least 10 characters long")
    .regex(passwordRegex, "Password should contain at least on number"),
});

export async function handleform(prevState: string, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  console.log(data);
  const result = await formSchema.safeParseAsync(data);
  console.log(result);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password);
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong Password!"],
          email: [],
          username: [],
        },
      };
    }
  }
}
