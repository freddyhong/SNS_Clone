import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import TweetList from "@/app/components/tweet-list";
import AddTweet from "../components/add-tweet";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
}

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          Like: true,
          Comment: true,
        },
      },
    },
    take: 3,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export default async function Home() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/login");
  };

  const initialTweets = await getInitialTweets();

  return (
    <div className="flex flex-col w-full gap-6 my-10">
      <div className="flex flex-row w-full justify-between">
        <h1 className="text-slate-700 font-semibold text-2xl">
          Welcome, {user?.username}
        </h1>
        <form action={logOut} className="flex justify-end">
          <button className="text-slate-700 font-medium hover:text-slate-700 hover:font-bold transition">
            Log Out
          </button>
        </form>
      </div>

      <AddTweet />
      {initialTweets.length ? (
        <TweetList initialTweets={initialTweets} />
      ) : (
        <span>There is no tweet yet.</span>
      )}
    </div>
  );
}
