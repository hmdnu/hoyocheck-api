import { Client } from "pg";
import { handlePromise } from "../utils/handlePromise";
import { Env } from "../utils/constants";
import { TQuery, TUser } from "../types";

const client = new Client({
  host: Env.dbHost,
  user: Env.dbUser,
  port: Number(Env.port),
  password: Env.dbPassword,
  database: Env.dbName,
});

export async function createTableUser(client: Client) {
  const res = client.query(
    `CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(225) PRIMARY KEY NOT NULL,
      username VARCHAR(225) NOT NULL, 
      discord_user_id VARCHAR(225) NOT NULL,
      ltoken_v2 TEXT NOT NULL,
      ltuid_v2 VARCHAR(225) NOT NULL
    )`
  );
  const [_, error] = await handlePromise(res);

  if (error) {
    console.log(error);
    throw error;
  }
}

export async function getUsers(): Promise<TUser[] | unknown> {
  const res = client.query("SELECT id, username, discord_user_id, ltoken_v2, ltuid_v2 FROM users");
  const [promise, error] = await handlePromise(res);

  if (error) {
    console.log(error);

    throw error;
  }

  return promise?.rows;
}

export async function getUser(dcUserId: string) {
  const query: TQuery = {
    text: "SELECT id, username, discord_user_id, ltoken_v2, ltuid_v2 FROM users WHERE discord_user_id = $1",
    values: [dcUserId],
  };

  const res = client.query(query);

  const [promise, error] = await handlePromise(res);

  if (error) {
    console.log(error);
    throw error;
  }
  return promise?.rows[0];
}

export async function insertTableUser({ id, username, discord_user_id, ltoken_v2, ltuid_v2 }: TUser) {
  const query: TQuery = {
    text: "INSERT INTO users (id, username, discord_user_id, ltoken_v2, ltuid_v2) VALUES($1, $2, $3, $4, $5)",
    values: [id, username, discord_user_id, ltoken_v2, ltuid_v2],
  };
  const res = client.query(query);

  const [_, error] = await handlePromise(res);

  if (error) {
    console.log(error);
    throw error;
  }

  return res;
}

export async function runDb() {
  const connection = client.connect();
  const [_, error] = await handlePromise(connection);

  if (error) {
    console.log("database failed to connect", error);
    throw error;
  }

  console.log("database connected");
}
