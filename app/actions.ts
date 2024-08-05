"use server";
export async function handleform(prevState: string, formData: FormData) {
  const password = formData.get("password");
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (password == "12345") {
    return "pass";
  } else {
    return "Wrong Password!";
  }
}
