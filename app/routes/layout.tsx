import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { getUserCookie } from "~/cookies/userCookie";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUserCookie(request);

  return { user };
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const user = loaderData.user ?? "Guest";

  return (
    <>
      <header style={{ padding: "10px 20px", backgroundColor: "#1c1c" }}>
        Hello {user}
      </header>
      <Outlet />
    </>
  );
}
