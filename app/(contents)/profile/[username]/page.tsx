import db from "@/lib/db";
import getSession from "@/lib/session";
import { getTweet, getUser } from "./actions";
import { notFound, redirect } from "next/navigation";
import FormBtn from "../../../components/form-btn";
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

export async function TweetListItem({ id, created_at, user }: TweetListProps) {
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

export default async function User({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser(params.username);

  return (
    <div className="flex flex-col w-full gap-3 my-10">
      <h2 className="mb-5 text-lg font-bold text-neutral-400">Profile</h2>
      <section className="mb-10 md:grid grid-flow-col items-center">
        <ul className="w-full flex flex-col gap-3 px-5 *:flex *:flex-row *:gap-3">
          <li>
            <span className="opacity-80 font-semibold">name:</span>
            <p>{user?.username}</p>
          </li>
          <li>
            <span className="opacity-80 font-semibold">email:</span>
            <p>{user?.email}</p>
          </li>
          <li className="w-full">
            <Link
              href={`/profile/${user?.username}/edit`}
              className="w-full p-3 rounded-3xl mt-3 text-center bg-rose-300 text-white font-medium hover:bg-rose-500 transition disabled:bg-neutral-400 disabled:text-neutral-100"
            >
              Edit Profile
            </Link>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="mb-5 text-lg font-bold text-neutral-400">Tweets</h2>
        <ul className="flex flex-col gap-5 last:border-b-0">
          {user?.Tweet?.map((tweet) => (
            <TweetListItem key={tweet.id} user={user} {...tweet} />
          ))}
        </ul>
      </section>
    </div>
  );
}
