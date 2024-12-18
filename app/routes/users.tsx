import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/users";
import { getUserCookie } from "~/cookies/userCookie";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Users" }];
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export async function loader({ request }: Route.LoaderArgs) {
  const result = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await result.json()) as User[];

  return { users };
}

export default function Users({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <main style={{ marginTop: 12 }}>
      <div>
        <button onClick={() => navigate("/posts")}>to Posts</button>
        <button onClick={() => navigate("/")}>to Home</button>
      </div>

      <div>
        {loaderData.users.map((user) => (
          <div key={user.id}>
            {user.name} - {user.username}; {user.email}; {user.website}
          </div>
        ))}
      </div>
    </main>
  );
}
