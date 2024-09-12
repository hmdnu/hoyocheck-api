import { Context } from "hono";
import { handleFetch } from "../services/hoyolab";
import { Endpoints } from "../utils/constants";
import { handlePromise } from "../utils/handlePromise";
import { TData, TResultData, TUser } from "../types";
import { StatusCodes as http } from "http-status-codes";
import { insertTableUser } from "../libs/db";
import { nanoid } from "nanoid";

export async function beginAutoCheck(c: Context) {
  const data = handleFetch(Endpoints);

  const [promise, error] = await handlePromise(data);

  if (error) {
    console.log(error);
    return c.json({ error }, http.INTERNAL_SERVER_ERROR);
  }

  const checkData = promise as TResultData[];

  return c.json(
    {
      data: checkData,
    },
    http.OK
  );
}

export async function getStatus(c: Context) {}

export async function addUser(c: Context) {
  const req = c.req.json();

  const [promise, error] = await handlePromise(req);

  if (error) {
    console.log(error);
    return c.json({ error });
  }

  const user = promise as TUser;

  const addUser = insertTableUser({
    id: nanoid(),
    username: user.username,
    discord_user_id: user.discord_user_id,
    ltoken_v2: user.ltoken_v2,
    ltuid_v2: user.ltuid_v2,
  });

  return c.json({ message: "success" });
}
