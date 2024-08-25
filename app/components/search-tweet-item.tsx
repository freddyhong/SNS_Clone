import React from "react";
import Link from "next/link";

interface TweetListProps {
  id: number;
  tweet: string;
  created_at: Date;
  user: {
    username: string;
    avatar?: string | null;
  };
  updated_at: Date;
}

export default function TweetListItem({
  tweet,
  id,
  created_at,
  user,
}: TweetListProps) {
  return (
    <li className="w-full rounded-xl ring-4 ring-rose-300 hover:bg-rose-200 transition px-6 py-4">
      <Link href={`/tweets/${id}`}>
        <div className="flex flex-col gap-3  w-full ">
          <div className="flex flex-row justify-between *:text-sm">
            <h4 className="font-semibold">{user.username}</h4>
            <span>
              {created_at.toLocaleString("en-GB", {
                timeZone: "UTC",
              })}
            </span>
          </div>
          <p className="w-full">{tweet}</p>
        </div>
      </Link>
    </li>
  );
}
