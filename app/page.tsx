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

export default function Home() {
  const [state, action] = useFormState(handleform, "" as string);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 mx-auto min-h-screen items-center mt-36">
      <FireIcon className="text-red-300 h-14 w-14" />
      <form action={action} className="w-96 flex flex-col gap-4 items-center">
        <div className="relative w-full">
          <input
            name="email"
            className="main_input"
            type="email"
            placeholder="Email"
            required
          />
          <div
            className="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"
          >
            <EnvelopeIcon className="h-6 w-5 text-gray-500" />
          </div>
        </div>
        <div className="relative w-full">
          <input
            name="username"
            className="main_input"
            type="text"
            placeholder="Username"
            required
          />
          <div
            className="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"
          >
            <UserIcon className="h-6 w-5 text-gray-500" />
          </div>
        </div>
        {state === "pass" || state === "" ? (
          <div className="relative w-full">
            <input
              className="main_input mb-3"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <div
              className="absolute top-2 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"
            >
              <KeyIcon className="h-6 w-5 text-gray-500" />
            </div>
          </div>
        ) : (
          <div className="relative w-full">
            <input
              className="wrong_input mb-3"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <div
              className="absolute top-2 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"
            >
              <KeyIcon className="h-6 w-5 text-gray-500" />
            </div>
            <span className="ml-2 text-red-400">
              {state === "" ? null : "Wrong Password!"}
            </span>
          </div>
        )}
        <FormBtn />
        {state !== "pass" ? null : (
          <span className=" flex w-96 py-3 px-5 gap-3 text-center rounded-full bg-green-400 font-medium text-white">
            <CheckBadgeIcon className=" h-6 w-6 " /> Welcome Back
          </span>
        )}
      </form>
    </div>
  );
}
