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
    <div className="flex flex-col items-center min-h-screen px-5 pt-6">
      <h1 className="mb-5 font-semibold text-lg">
        "{keyword}"로 검색한 결과 : {tweets.length}건
      </h1>
      <TweetSearchList initialTweets={tweets} keyword={keyword} />
    </div>
  );
}
