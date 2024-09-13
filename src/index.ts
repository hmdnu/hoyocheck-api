import { Hono } from "hono";
import { runDb } from "./libs/db";
import { addUser, beginAutoCheck, checkSingle } from "./controllers/autoCheck";
import { Env } from "./utils/constants";
import { StatusCodes as http } from "http-status-codes";

const app = new Hono();

// run db
runDb().then((res) => res);

app.use("/*", async (c, next) => {
  const query = c.req.query("key");

  if (query !== Env.apiKey) {
    return c.json({ error: "Unauthorized access" }, http.UNAUTHORIZED);
  }
  await next();
});

app.get("/", (c) => c.json({ message: "hello" }));
app.get("/checkInAll", async (c) => await beginAutoCheck(c));
app.get("/check/:dcId", async (c) => await checkSingle(c));

app.post("/add", async (c) => await addUser(c));

export default app;
