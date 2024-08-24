"use client";

import React from "react";
import Image from "next/image";
import { UserInfo } from "../(contents)/profile/[username]/edit/page";
import { useState } from "react";
import { formSchema } from "../(auth)/create-account/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "./form";
import { z } from "zod";
import db from "../../lib/db";
import FormBtn from "./form-btn";

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
    setError("password", { message: errors?.fieldErrors.password?.at(0) });
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <form action={onValid} className="flex flex-col gap-3 md:px-5">
      <FormInput
        placeholder={userInfo?.username}
        type="text"
        required
        {...register("username")}
        error={errors?.username?.message}
      />
      <FormInput
        placeholder={userInfo?.email}
        type="email"
        required
        {...register("email")}
        error={errors?.email?.message}
      />
      <FormInput
        placeholder="정보 수정을 위해 기존 비밀번호를 입력해주세요"
        type="password"
        required
        {...register("password")}
        error={errors?.password?.message}
      />
      <FormInput
        placeholder="새로운 비밀번호를 입력해주세요"
        type="password"
        {...register("newPassword")}
        error={errors.newPassword?.message}
      />
      <FormInput
        placeholder="새로운 비밀번호를 확인해주세요"
        icon="✔️"
        type="password"
        {...register("confirmNewPassword")}
        error={errors.confirmNewPassword?.message}
      />
      <FormBtn text="Submit New Profile" />
    </form>
  );
}
