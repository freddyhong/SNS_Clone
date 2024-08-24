import React from "react";
import db from "../../../../../lib/db";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import FormEditProfile from "../../../../components/edit-profile";

async function getUserInfo(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  return user;
}

export type UserInfo = Prisma.PromiseReturnType<typeof getUserInfo>;

export default async function EditUserProfile({
  params,
}: {
  params: { username: string };
}) {
  const name = params.username;
  if (!name) {
    notFound();
  }
  const user = await getUserInfo(name);

  return (
    <div className="flex flex-col w-full gap-3 my-10">
      <h2 className="mb-5 text-lg font-bold text-slate-600">Edit Profile</h2>
      <section className="mb-10 md:grid grid-flow-col items-center">
        <FormEditProfile userInfo={user} />
      </section>
    </div>
  );
}
