import { Context } from "hono";
import { beginCheckIn, beginCheckSingle } from "../services/hoyolab";
import { handlePromise } from "../utils/handlePromise";
import { TResultData, TUser } from "../types";
import { StatusCodes as http } from "http-status-codes";
import { nanoid } from "nanoid";
import { getUserByDcId, getUsers, insertUser } from "../db";

export async function beginAutoCheck(c: Context) {
  const data = beginCheckIn(getUsers(c.env));

  const [promise, error] = await handlePromise(data);

  if (error) {
    console.log(error);
    return c.json({ error }, http.INTERNAL_SERVER_ERROR);
  }

  const checkData = promise as TResultData[];

  return c.json({ data: checkData }, http.OK);
}

export async function checkSingle(c: Context) {
  const dcUserId = c.req.param("dcId");

  const user = getUserByDcId(dcUserId, c.env);

  const [userPromise, userError] = await handlePromise(user);

  if (userError) {
    console.log(userError);

    return c.json({ error: userError }, http.INTERNAL_SERVER_ERROR);
  }

  const userData = beginCheckSingle(userPromise as TUser);

  const [userDataPromise, userDataError] = await handlePromise(userData);

  if (userDataError) {
    console.log(userDataError);
    return c.json({ error: userDataError }, http.INTERNAL_SERVER_ERROR);
  }

  return c.json({ user: userPromise, data: userDataPromise }, http.OK);
}

export async function addUser(c: Context) {
  const user: TUser = await c.req.json();

  const res = insertUser(
    {
      id: nanoid(),
      username: user.username,
      discordUserId: user.discordUserId,
      ltokenV2: user.ltokenV2,
      ltuidV2: user.ltuidV2,
    },
    c.env
  );

  const [_, error] = await handlePromise(res);

  if (error) {
    const sqlError = error as { code: string; detail: string };

    if (sqlError.code === "23505") {
      return c.json({ error: sqlError.detail }, http.CONFLICT);
    }

    return c.json({ error: "Unknown error" }, http.INTERNAL_SERVER_ERROR);
  }

  return c.json({ message: "success" }, http.OK);
}
