"use client";

import React from "react";
import Image from "next/image";
import { UserInfo } from "../(contents)/profile/[username]/edit/page";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "./form";
import { z } from "zod";
import db from "../../lib/db";
import FormBtn from "./form-btn";
import { useFormState } from "react-dom";
import { handleform } from "../(auth)/login/actions";

const checkPasswords = async ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user) === false;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Please enter your username",
      })
      .toLowerCase()
      .trim()
      .refine(checkUniqueUsername, "This username is already taken"),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(
        checkUniqueEmail,
        "There is an account already registered with this email."
      ),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

interface FormEditProfileProps {
  userInfo: UserInfo;
}

interface UserFormType {
  username: string;
  email: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function FormEditProfile({ userInfo }: FormEditProfileProps) {
  const [uploadUrl, setUploadUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userInfo?.username,
      email: userInfo?.email,
    },
  });

  const onSubmit = handleSubmit(async (data: UserFormType) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("newPassword", data.newPassword);
    formData.append("confirmNewPassword", data.confirmNewPassword);
  });

  const onValid = async () => {
    await onSubmit();
  };
  // @ts-ignore
  const [state, action] = useFormState(handleform, null);

  return (
    <form action={onValid} className="flex flex-col gap-3 md:px-5">
      <FormInput
        placeholder={userInfo?.username!}
        type="text"
        required
        {...register("username")}
        // @ts-ignore
        errors={state?.fieldErrors.username!}
      />
      <FormInput
        placeholder={userInfo?.email!}
        type="email"
        required
        {...register("email")}
        errors={state?.fieldErrors.email!}
      />
      <FormInput
        placeholder="정보 수정을 위해 기존 비밀번호를 입력해주세요"
        type="password"
        required
        {...register("password")}
        errors={state?.fieldErrors.password!}
      />
      <FormInput
        placeholder="새로운 비밀번호를 입력해주세요"
        type="password"
        {...register("newPassword")}
        // @ts-ignore
        errors={errors.newPassword?.message!}
      />
      <FormInput
        placeholder="새로운 비밀번호를 확인해주세요"
        icon="✔️"
        type="password"
        {...register("confirmNewPassword")}
        // @ts-ignore
        errors={errors.confirmNewPassword?.message}
      />
      <FormBtn text="Submit New Profile" />
    </form>
  );
}
