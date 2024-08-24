import db from "../../../../lib/db";

export async function getTweet(tweetId: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
    },
  });
  if (tweet) {
    return tweet;
  }
}

export async function getUser(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      Tweet: {
        select: {
          id: true,
          created_at: true,
          updated_at: true,
          tweet: true,
          Like: true,
          _count: {
            select: {
              Like: true,
            },
          },
        },
      },
    },
  });
  if (user) {
    return user;
  }
}
