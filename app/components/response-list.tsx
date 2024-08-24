"use client";

import React from "react";

interface ResponseListProps {
  responses: {
    id: number;
    comment: string;
    user: {
      username: string;
    };
  }[];
}

export default function ResponseList({ responses }: ResponseListProps) {
  return (
    <div className="flex flex-col gap-6 max-h-fit p-3">
      {responses.map((response) => (
        <div
          key={response.id}
          className="flex justify-between items-center px-6 py-4 gap-2 rounded-xl ring-4 ring-slate-300"
        >
          <span className="text-lg font-medium text-slate-700">
            {response.comment}
          </span>
          <span className="text-md text-slate-500">
            {response.user.username}
          </span>
        </div>
      ))}
    </div>
  );
}
