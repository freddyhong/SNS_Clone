"use client";
import Link from "next/link";
import getTweets, { Tweets } from "./actions";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import AddTweet from "../components/tweet-form";

export default function Home() {
  const [page, setPage] = useState(0);
  const [tweets, setTweets] = useState<Tweets>();
  const [total, setTotal] = useState<number>();
  useEffect(() => {
    getTweets(page).then(({ tweets, total }) => {
      setTweets(tweets);
      setTotal(total);
    });
  }, [page]);

  return (
    <div className="flex flex-col gap-10 py-8 px-6 mx-auto min-h-screen items-center mt-36">
      <AddTweet />
      <div className="flex gap-7">
        <ArrowLeftIcon
          className="cursor-pointer h-6 w-h-6 items-center"
          onClick={() => setPage((prev) => (prev > 0 ? --prev : prev))}
        />
        <h2>{page + 1}</h2>
        <ArrowRightIcon
          className="cursor-pointer h-6 w-h-6"
          onClick={() =>
            setPage((prev) => (total && prev < total - 1 ? ++prev : prev))
          }
        />
      </div>
      {tweets?.map(({ userId, tweet, id }) => (
        <Link
          href={`/tweets/${id}`}
          key={id}
          className="flex bg-red-200 w-fit cursor-pointer p-6"
        >
          <h2>{userId}: &nbsp;</h2>
          <h2>{tweet}</h2>
        </Link>
      ))}
    </div>
  );
}
