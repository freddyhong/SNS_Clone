import db from "@/lib/db";
import getSession from "@/lib/session";
import { getTweet, getUser } from "./actions";
import { notFound, redirect } from "next/navigation";
import FormBtn from "../../../components/form-btn";
import Link from "next/link";
import TweetListItem from "@/app/components/search-tweet-item";

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
