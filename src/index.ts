import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client/edge";
import { swagger } from "@elysiajs/swagger";

const setup = (app: Elysia) => app.decorate("db", new PrismaClient());
const swaggerConfig = swagger({
  path: "/v1/swagger",
});
const schema = {
  query: t.Object({
    q: t.String(),
  }),
};
const app = new Elysia()
  // 🎬 Movie API routes 🎬
  .use(swaggerConfig)
  .use(setup)
  .group("/auth", (app) => {
    return app
      .get("/login", async ({ query, db }) => db.user.findMany())
      .post(
        "/",
        async ({ body, query, db }) => {
          console.log(body);
          return body.name.split("");
        },
        {
          query: t.Object({
            add: t.String(),
          }),
          body: t.Object({
            name: t.String(),
            age: t.Number(),
          }),
        }
      );
  })

  .listen(5050);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
