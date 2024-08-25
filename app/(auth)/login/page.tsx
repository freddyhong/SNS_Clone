"use client";

import {
  CheckBadgeIcon,
  FireIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { handleform } from "./actions";
import { useFormState } from "react-dom";
import "@/lib/db";
import FormInput from "@/app/components/form";
import FormBtn from "@/app/components/form-btn";

export default function Home() {
  const [state, action] = useFormState(handleform, null);
  console.log(state);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 mx-auto min-h-screen items-center mt-36">
      <FireIcon className="text-red-300 h-14 w-14" />
      <form action={action} className="w-96 flex flex-col gap-4 items-center">
        <div className="relative w-full">
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors?.email}
          />
        </div>
        <div className="relative w-full">
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            required
            errors={state?.fieldErrors?.password}
          />
        </div>

        <FormBtn text="Log In" />
        <div className="w-full">
          <span>
            Don't have an account?{" "}
            <Link
              className="text-red-300 hover:underline hover:underline-offset-2 hover:text-red-400 transition-all"
              href="/create-account"
            >
              Create Account
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
