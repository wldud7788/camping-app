"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    // return encodedRedirect(
    //   "success",
    //   "/sign-up",
    //   "Thanks for signing up! Please check your email for a verification link."
    // );
    redirect("/");
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

import { v4 as uuidv4 } from "uuid"; // UUID 라이브러리 추가
export const createPostAction = async (formData: FormData) => {
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const imageFile = formData.get("image"); // 이미지 파일 가져오기
  const supabase = createClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  // 1. 필수 필드 유효성 검사
  if (!title || !content) {
    return encodedRedirect(
      "error",
      "/community/post",
      "Title and content are required"
    );
  }

  // 2. 현재 사용자 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return encodedRedirect("error", "/community/post", "Could not fetch user");
  }

  const uuid = user?.id;

  // 3. 이미지 파일이 있을 경우 파일명 생성 및 업로드
  let imageUrl: string | undefined; // imageUrl 초기화
  if (imageFile instanceof File) {
    const fileExtension = imageFile.name.split(".").pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(`images/${uuid}/${uniqueFileName}`, imageFile);

    if (uploadError) {
      console.error("이미지 업로드 실패:", uploadError);
      return encodedRedirect(
        "error",
        "/community/post",
        "Could not upload image"
      );
    }

    // 이미지 URL 생성 - 업로드 성공 후에만
    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/images/${uuid}/${uniqueFileName}`;
  }

  // 4. 게시물 데이터 삽입
  const postData: any = {
    title,
    content,
    uuid,
  };

  // 이미지가 있을 때만 imageUrl 추가
  if (imageUrl) {
    postData.imageUrl = imageUrl; // imageUrl이 존재할 때만 추가
  }

  const { error } = await supabase.from("posts").insert([postData]);

  if (error) {
    return encodedRedirect("error", "/community/post", "Could not create post");
  }

  // 5. 성공 시 리디렉션 처리
  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/community/post",
    "Post created successfully."
  );
};
