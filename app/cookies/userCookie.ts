import { createCookie } from "react-router";

export const userCookie = createCookie("user", {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + 60_000),
  maxAge: 60,
});

export const getUserCookie = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie");
  const user = (await userCookie.parse(cookieHeader)) as string | null;

  return user;
};
