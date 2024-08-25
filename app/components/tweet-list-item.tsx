import { getTweet, getUser } from "../(contents)/profile/[username]/actions";
import React from "react";
import Link from "next/link";

interface TweetListProps {
  id: number;
  created_at: Date;
  user: {
    username: string;
    avatar?: string | null;
  };
  updated_at: Date;
}

export async function TweetListItem({ id, user }: TweetListProps) {
  const Tweet = await getTweet(id);
  return (
    <li className="w-full">
      <Link href={`/tweets/${id}`} className=" ">
        <div className="flex flex-col px-6 py-4 gap-2 rounded-xl ring-4 ring-slate-300">
          <span className="text-lg font-medium text-slate-700">
            {Tweet?.tweet}
          </span>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">
              {Tweet?.created_at.toLocaleString("en-GB", {
                timeZone: "UTC",
              })}
            </span>
            <span className="text-md text-slate-500">{user?.username}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
