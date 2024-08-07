"use client";

import {
  CheckBadgeIcon,
  FireIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import FormBtn from "./components/form-btn";
import Link from "next/link";
import { handleform } from "./actions";
import { useFormState } from "react-dom";
import FormInput from "./components/form";

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
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={state?.fieldErrors?.username}
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

        <FormBtn />
        {state?.logined && (
          <span className=" flex w-96 py-3 px-5 gap-3 text-center rounded-full bg-green-400 font-medium text-white">
            <CheckBadgeIcon className=" h-6 w-6 " /> Welcome Back
          </span>
        )}
      </form>
    </div>
  );
}
