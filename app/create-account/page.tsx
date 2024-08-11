"use client";
import { useFormState } from "react-dom";
import FormBtn from "../components/form-btn";
import FormInput from "../components/form";
import Link from "next/link";
import { createAccount } from "./action";

export default function Create_Account() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 mx-auto min-h-screen items-center mt-36">
      <form action={dispatch} className="w-96 flex flex-col gap-4 items-center">
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
        <div className="relative w-full">
          <FormInput
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
            errors={state?.fieldErrors?.confirm_password}
          />
        </div>

        <FormBtn text="Create Account" />
      </form>
    </div>
  );
}
