import { Await, useNavigate } from "react-router";
import type { Route } from "./+types/posts";
import { Suspense } from "react";
import { ToUsersButton } from "~/components/ToUsersButton";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Posts" }];
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const postsData = fetch(
    "https://jsonplaceholder.typicode.com/posts?_start=5&_limit=10"
  ).then((response) => response.json()) as Promise<Post[]>;

  return { postsData };
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <main style={{ marginTop: 12 }}>
      <ToUsersButton />
      <button onClick={() => navigate("/")}>to Home</button>

      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={loaderData.postsData} errorElement={<div>error</div>}>
          {(posts) => (
            <div>
              {posts.map((post) => (
                <div key={post.id}>
                  {post.title} - {post.userId}
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
