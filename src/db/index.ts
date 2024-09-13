import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { TUser } from "../types";
import { usersTable } from "./schema";
import { handlePromise } from "../utils/handlePromise";
import { eq } from "drizzle-orm";
import { env } from "../utils/env";
import { TEnv } from "..";

export function getDbClient(env: TEnv) {
  const client = postgres(env.DATABASE_URL!);
  return drizzle(client);
}

export async function insertUser(user: TUser, env: TEnv) {
  const db = getDbClient(env);
  const res = db.insert(usersTable).values({ ...user });

  const [promise, error] = await handlePromise(res);

  if (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserByDcId(dcId: string, env: TEnv) {
  const db = getDbClient(env);
  const res = db.select().from(usersTable).where(eq(usersTable.discordUserId, dcId));

  const [promise, error] = await handlePromise(res);

  if (error) {
    throw error;
  }

  return promise;
}

export async function getUsers(env: TEnv) {
  const db = getDbClient(env);
  const res = db.select().from(usersTable);

  const [promise, error] = await handlePromise(res);

  if (error) {
    console.log(error);
    throw error;
  }

  return promise;
}
