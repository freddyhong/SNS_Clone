import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  const tweet = await db.tweet.create({
    data: {
      tweet: "test",
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });
}
test();

export default db;
