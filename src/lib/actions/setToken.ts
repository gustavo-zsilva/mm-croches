"use server";

import { cookies } from "next/headers";

type ActionProps = {
  idToken: string;
};

export async function handleSetToken({ idToken }: ActionProps) {
  const cookieStore = cookies();
  cookieStore.set("token", idToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
