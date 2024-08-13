import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import FormBtn from "../../components/form-btn";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/login");
  };
  return (
    <div className="flex flex-col gap-10 py-8 px-6 mx-auto min-h-screen items-center mt-36">
      <h1>Welcome {user?.username} !</h1>
      <h1>Your Email: {user?.email}</h1>
      <form action={logOut}>
        <FormBtn text="Log Out" />
      </form>
    </div>
  );
}
