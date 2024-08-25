"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect, useParams } from "next/navigation";
import { stringify } from "querystring";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

const tweetSchema = z.object({
  tweet: z
    .string()
    .min(5, "Tweet should be at least 5 characters long.")
    .max(100, "The character limit has been exceeded."),
});

const searhSchema = z.object({
  keyword: z.string({
    required_error: "Type a keyword to search for...",
  }),
});

export async function validateSearchKeyword(_: any, formData: FormData) {
  const data = {
    keyword: formData.get("keyword"),
  };
  const result = await searhSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const encodedKeyword = encodeURI(result.data.keyword);
    revalidatePath(`/search?keyword=${encodedKeyword}`);
    redirect(`/search?keyword=${encodedKeyword}`);
  }
}

export async function addTweet(prevState: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = await tweetSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
      });
      redirect(`tweets/${tweet.id}`);
    }
  }
}

export async function getNextTweets(cursorId: number) {
  const nextTweets = await db.tweet.findMany({
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
    cursor: { id: cursorId },
    skip: cursorId ? 1 : 0,
    take: 3,
    orderBy: {
      created_at: "desc",
    },
  });
  return nextTweets;
}

export async function getPrevTweets(cursorId: number, tweetslength: number) {
  const prevTweets = await db.tweet.findMany({
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
    cursor: { id: cursorId },
    skip: tweetslength,
    take: -3,
    orderBy: {
      created_at: "desc",
    },
  });
  return prevTweets;
}

async function getComments(id: number) {
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
const getCachedResponses = unstable_cache(getComments, ["response-list"]);

export const getCommentsCached = async () =>
  unstable_cache(getComments, ["get-comments"], {
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

export const getLikesCached = async (tweetId: number, userId: number) =>
  unstable_cache(getLikes, [`get-likes`], {
    tags: [`get-likes-${tweetId}`],
  })(tweetId, userId);

export async function addComment(
  prevState: any,
  { formData, tweetId }: { formData: FormData; tweetId: number }
) {
  const data = {
    response: formData.get("comment"),
  };
  const formSchema = z
    .string()
    .refine((t) => !t.includes("wrong"), "remove keyword: 'wrong'");
  const result = await formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      await db.comment.create({
        data: {
          comment: result.data,
          user: {
            connect: {
              id: session.id,
            },
          },
          tweet: {
            connect: {
              id: tweetId,
            },
          },
        },
      });
      revalidatePath(`/tweets/${tweetId}`);
    }
  }
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
