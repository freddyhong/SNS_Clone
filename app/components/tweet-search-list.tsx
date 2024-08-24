"use client";

import React from "react";
import { InitialTweet } from "../(contents)/search/actions";
import { useEffect, useState } from "react";
import TweetListItem from "../(contents)/profile/[username]/page";

interface TweetListProps {
  initialTweets: InitialTweet;
  keyword: string;
}

export default function TweetSearchList({
  initialTweets,
  keyword,
}: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  useEffect(() => {
    if (keyword) {
      setTweets(initialTweets);
    }
  }, [keyword]);
  return (
    <div className="flex flex-col gap-5 w-full px-2">
      <ul className="w-full flex flex-col gap-5">
        {tweets.map((tweet) => (
          <TweetListItem key={tweet.id} {...tweet} />
        ))}
      </ul>
      {tweets.length === 0 && (
        <p className="text-rose-600 text-center font-semibold text-sm">
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
}
