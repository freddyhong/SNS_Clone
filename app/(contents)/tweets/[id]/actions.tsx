import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag, unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

export default async function getComment(id: number) {
  return db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      Comment: {
        select: {
          id: true,
          comment: true,
          user: true,
        },
      },
    },
  });
}

export async function getTweet(id: number) {
  return db.tweet.findUnique({
    where: { id },
  });
}

export async function getUser(params: number | undefined) {
  const user = await db.user.findUnique({
    where: {
      id: params,
    },
  });
  if (user) {
    return user.username;
  } else {
    notFound();
  }
}
