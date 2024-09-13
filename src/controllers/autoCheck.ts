import { Context } from "hono";
import { beginCheckIn } from "../services/hoyolab";
import { handlePromise } from "../utils/handlePromise";
import { TResultData, TUser } from "../types";
import { StatusCodes as http } from "http-status-codes";
import { nanoid } from "nanoid";
import { DatabaseError } from "pg";
import { StatusCode } from "hono/utils/http-status";
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
  const [promise, error] = await handlePromise(user);

  if (error) {
    console.log(error);

    return c.json({ error }, http.INTERNAL_SERVER_ERROR);
  }

  return c.json({ user: promise }, http.OK);
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
    let errorMessage = { error: "internal server error", code: 500 };

    if (error instanceof DatabaseError) {
      switch (error.code) {
        case "23505":
          errorMessage.code = http.CONFLICT;
          errorMessage.error = error.message;
          break;

        default:
          errorMessage.code = http.INTERNAL_SERVER_ERROR;
          errorMessage.error = error.message;
          break;
      }
      return c.json({ error: errorMessage }, errorMessage.code as StatusCode);
    }
    return c.json({ error }, http.INTERNAL_SERVER_ERROR);
  }

  return c.json({ message: "success" }, http.OK);
}
