import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("/users", "routes/users.tsx"),
    route("/posts", "routes/posts.tsx"),
  ]),
] satisfies RouteConfig;
