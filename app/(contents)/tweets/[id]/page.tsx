import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { getTweet, getUser } from "./actions";
import getComment from "./actions";
import Link from "next/link";
import AddTweet from "@/app/components/tweet-form";
import getTweets, { getCommentsCached, getLikesCached } from "../../actions";
import Comments from "@/app/components/comments";
import LikeBtn from "@/app/components/like-btn";

export default async function Tweet({ params }: { params: { id: string } }) {
  const tweetId = +params.id;
  const tweet = await getTweet(tweetId);
  const comments = await getCommentsCached(tweetId);
  const { count, isLiked } = await getLikesCached(tweetId, tweet?.userId!);
  return (
    <div className="w-4/5 flex gap-1 flex-col mx-auto min-h-screen items-center py-8 px-6">
      <Link
        href={`/`}
        className=" self-start py-4 hover:text-red-300 transition-colors"
      >
        <ArrowLeftIcon className="cursor-pointer h-6 w-h-6 items-center" />
      </Link>
      <LikeBtn count={count} isLiked={isLiked} tweetId={tweetId} />
      <Comments
        comments={comments.comments}
        tweetId={tweetId}
        userId={tweet?.userId!}
      />
    </div>
  );
}
