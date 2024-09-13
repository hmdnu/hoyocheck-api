import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Env } from "../utils/constants";
import { TUser } from "../types";
import { usersTable } from "./schema";
import { handlePromise } from "../utils/handlePromise";
import { eq } from "drizzle-orm";

const client = postgres(Env.dbUrl!);

export const db = drizzle(client);

export async function insertUser(user: TUser) {
  const res = db.insert(usersTable).values({ ...user });

  const [promise, error] = await handlePromise(res);

  if (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserByDcId(dcId: string) {
  const res = db.select().from(usersTable).where(eq(usersTable.discordUserId, dcId));

  const [promise, error] = await handlePromise(res);

  if (error) {
    throw error;
  }

  return promise;
}

export async function getUsers() {
  const res = db.select().from(usersTable);

  const [promise, error] = await handlePromise(res);

  if (error) {
    console.log(error);
    throw error;
  }

  return promise;
}
