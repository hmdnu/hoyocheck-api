import { Hono } from "hono";
import { runDb } from "./libs/db";
import { addUser, beginAutoCheck, checkSingle } from "./controllers/autoCheck";

const app = new Hono();

// run db
runDb().then((res) => res);

app.get("/checkAll", async (c) => await beginAutoCheck(c));
app.post("/add", async (c) => await addUser(c));
app.get("/check/:dcId", async (c) => await checkSingle(c));

export default app;
