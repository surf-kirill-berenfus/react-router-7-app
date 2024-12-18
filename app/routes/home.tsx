import { data, Form, useNavigate } from "react-router";
import { ToUsersButton } from "~/components/ToUsersButton";
import { getUserCookie, userCookie } from "~/cookies/userCookie";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Home" }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");

  return data(undefined, {
    headers: {
      "Set-Cookie": await userCookie.serialize(username),
    },
  });
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUserCookie(request);

  return { user };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <main
      style={{
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div>
        <ToUsersButton />
        <button onClick={() => navigate("/posts")}>to Posts</button>
      </div>

      {loaderData.user ? (
        <div>Welcome {loaderData.user}!</div>
      ) : (
        <Form method="post">
          <label>
            Username:
            <input autoComplete="off" type="text" name="username" />
          </label>
          <button type="submit">Submit</button>
        </Form>
      )}
    </main>
  );
}
