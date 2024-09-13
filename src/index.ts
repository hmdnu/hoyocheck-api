import { Hono } from "hono";
import { addUser, beginAutoCheck, checkSingle } from "./controllers/autoCheck";
import { StatusCodes as http } from "http-status-codes";

type Bindings = {
  DATABASE_URL: string;
  API_TOKEN: string;
};

export type TEnv = {
  API_TOKEN: string;
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/*", async (c, next) => {
  const query = c.req.query("key");

  if (query !== c.env.API_TOKEN) {
    return c.json({ error: "Unauthorized access" }, http.UNAUTHORIZED);
  }
  await next();
});

app.get("/", (c) => c.json({ message: "hello" }));
app.get("/checkInAll", async (c) => await beginAutoCheck(c));
app.get("/check/:dcId", async (c) => await checkSingle(c));
app.post("/add", async (c) => await addUser(c));

export default {
  async fetch(request, env, ctx): Promise<Response> {
    return app.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<TEnv>;
