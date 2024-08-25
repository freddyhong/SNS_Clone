"use client";

import React from "react";
import { validateSearchKeyword } from "../(contents)/actions";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function SearchBar() {
  const [state, dispatch] = useFormState(validateSearchKeyword, null);
  const [keywordValue, setKeywordValue] = useState("");
  const params = useParams();
  useEffect(() => {
    setKeywordValue("");
  }, [params]);
  return (
    <header className=" border-b-2 border-slate-400 text-gray-100 py-2 px-5 flex items-center justify-between">
      <div>
        <form
          action={dispatch}
          className="flex flex-col gap-1.5 relative text-slate-600 "
        >
          <button className="absolute top-1 left-1">
            <MagnifyingGlassIcon className="size-5 text-slate-500" />
          </button>
          <input
            name="keyword"
            value={keywordValue}
            onChange={(e) => setKeywordValue(e.currentTarget.value)}
            type="text"
            placeholder="Anything to search?"
            className="pl-8 text-sm py-1 bg-transparent border-b-[1px] border-b-gray-100 outline-none placeholder:text-gray-400 focus:outline-dashed  active:bg-transparent"
          />
          {state?.fieldErrors.keyword && (
            <p className="text-red-500 text-xs">{state?.fieldErrors.keyword}</p>
          )}
        </form>
      </div>
    </header>
  );
}
