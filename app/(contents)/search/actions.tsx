"use server";

import { Prisma } from "@prisma/client";
import db from "../../../lib/db";

export async function getSearchedTweet(keyword: string) {
  const tweets = await db.tweet.findMany({
    where: {
      OR: [
        {
          tweet: {
            contains: keyword,
          },
        },
      ],
    },
    select: {
      id: true,
      created_at: true,
      updated_at: true,
      tweet: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return tweets;
}

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      created_at: true,
      updated_at: true,
      tweet: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    take: 3,
    orderBy: { created_at: "desc" },
  });
  return tweets;
}

export type InitialTweet = Prisma.PromiseReturnType<typeof getInitialTweets>;
