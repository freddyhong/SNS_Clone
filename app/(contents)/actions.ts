"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import getSession from "@/lib/session";
import { useParams } from "next/navigation";
import { stringify } from "querystring";
import { revalidateTag, unstable_cache } from "next/cache";

export default async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  const total = await db.tweet.count();

  return { tweets, total };
}

export async function getComments(tweetId: number) {
  const comments = await db.comment.findMany({
    where: {
      tweetId: tweetId,
    },
  });
  return { comments };
}

export type Tweets = Prisma.PromiseReturnType<typeof getTweets>["tweets"];
export type CommentType = Prisma.PromiseReturnType<
  typeof getComments
>["comments"];

export const getCommentsCached = unstable_cache(getComments, ["get-comments"], {
  tags: ["get-comments"],
});

export async function getLikes(tweetId: number, userId: number) {
  const count = await db.like.count({ where: { tweetId } });
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId: userId,
      },
    },
  });
  return { count, isLiked: Boolean(isLiked) };
}

export const getLikesCached = (tweetId: number, userId: number) =>
  unstable_cache(getLikes, [`get-likes`], {
    tags: [`get-likes-${tweetId}`],
  })(tweetId, userId);

export async function addTweet(prevState: any, formData: FormData) {
  const formSchema = z
    .string()
    .refine((t) => !t.includes("wrong"), "remove keyword: 'wrong'");
  const data = formData.get("tweet");
  const { success, error, data: tweet } = formSchema.safeParse(data);

  if (!success || !tweet) {
    return error?.flatten();
  }

  const session = await getSession();
  const userId = session.id;

  if (!userId) {
    return {
      formErrors: ["You must be logged in to tweet."],
    };
  }

  await db.tweet.create({
    data: {
      tweet,
      userId,
    },
  });
}

export async function addComment(
  prevState: any,
  formData: FormData,
  tweetId: number
) {
  const formSchema = z
    .string()
    .refine((t) => !t.includes("wrong"), "remove keyword: 'wrong'");
  const data = formData.get("comment");
  const { success, error, data: comment } = formSchema.safeParse(data);

  if (!success || !comment) {
    return error?.flatten();
  }

  const session = await getSession();
  const userId = session.id;

  if (!userId) {
    return {
      formErrors: ["You must be logged in to tweet."],
    };
  }

  await db.comment.create({
    data: {
      comment,
      userId,
      tweetId,
    },
  });
  revalidateTag("get-comments");
}

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  const userId = session.id!;

  await db.like.create({
    data: {
      userId,
      tweetId,
    },
  });

  revalidateTag(`get-likes-${tweetId}`);
}

export async function dislikeTweet(tweetId: number) {
  const session = await getSession();
  const userId = session.id!;

  try {
    await db.like.delete({
      where: {
        id: {
          userId,
          tweetId,
        },
      },
    });
  } catch (e) {}

  revalidateTag(`get-likes-${tweetId}`);
}
