import { getSearchedTweet } from "./actions";
import { notFound } from "next/navigation";
import TweetSearchList from "../../components/tweet-search-list";
import React from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { keyword: string };
}) {
  const keyword = searchParams.keyword;
  if (!keyword) {
    notFound();
  }

  const tweets = await getSearchedTweet(keyword);

  return (
    <div className="w-full flex flex-col items-center min-h-screen px-5 pt-6">
      <TweetSearchList initialTweets={tweets} keyword={keyword} />
    </div>
  );
}
