import Link from "next/link";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import AddResponse from "../../../components/add-comment";
import LikeTweet from "@/app/components/like-btn";
import ResponseList from "@/app/components/response-list";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
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
  });
  return tweet;
}
const getCachedTweet = unstable_cache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId: userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}
async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = unstable_cache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId!);
}

async function getResponses(id: number) {
  const responses = await db.comment.findMany({
    where: {
      tweetId: id,
    },
    select: {
      id: true,
      comment: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return responses;
}
const getCachedResponses = unstable_cache(getResponses, ["response-list"]);

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getCachedTweet(id);
  if (!tweet) {
    return notFound();
  }
  const isOwner = await getIsOwner(tweet.userId);

  const { isLiked, likeCount } = await getCachedLikeStatus(id);

  const responses = await getResponses(id);

  return (
    <div className="flex flex-col w-full gap-10 my-10 px-5 max-h-[85vh] overflow-y-scroll ">
      <h1 className="text-slate-700 font-semibold text-2xl">
        {tweet.user.username} Tweet
      </h1>
      <Link
        href={"/"}
        className="text-slate-700 font-medium hover:text-slate-700 hover:font-bold transition"
      >
        Go to List
      </Link>
      <div className="flex flex-col px-6 py-4 gap-2 rounded-xl ring-4 ring-slate-300">
        <span className="text-lg font-medium text-slate-700">
          {tweet.tweet}
        </span>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-400">
            {tweet.created_at.toLocaleString("en-GB", {
              timeZone: "UTC",
            })}
          </span>
          <span className="text-md text-slate-500">{tweet.user.username}</span>
        </div>
      </div>
      <LikeTweet isLiked={isLiked} likeCount={likeCount} tweetId={id} />

      <AddResponse tweetId={id} />

      <ResponseList responses={responses} />
      {/* {isOwner ? <DeleteTweet tweetId={id} /> : null} */}
    </div>
  );
}
