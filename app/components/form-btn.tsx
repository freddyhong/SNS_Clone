"use client";

import { useFormStatus } from "react-dom";

export default function FormBtn() {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <button
      disabled={pending}
      className=" disabled:bg-neutral-200 disabled:cursor-not-allowed  w-96 py-3 text-center rounded-full bg-red-200 font-medium hover:bg-red-300 transition-all active:w-[23rem]"
    >
      {pending ? "loading..." : "Log in"}
    </button>
  );
}
