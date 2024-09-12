import { Hono } from "hono";

import { runDb } from "./libs/db";
import { addUser, beginAutoCheck } from "./controllers/autoCheck";

const app = new Hono();

// run db
runDb().then((res) => res);

app.get("/check", async (c) => await beginAutoCheck(c));
app.post("/add", async (c) => await addUser(c));

export default app;
