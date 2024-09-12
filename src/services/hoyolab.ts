import { ofetch } from "ofetch";
import { TData, TEndpoint, TResultData, TUser } from "../types";
import { handlePromise } from "../utils/handlePromise";
import { getUsers } from "../libs/db";
import { Endpoints } from "../utils/constants";

export async function handleFetch(endpoints: TEndpoint[]): Promise<TResultData[] | undefined> {
  const users = getUsers();
  const [usersPromise, error] = await handlePromise(users);

  if (!usersPromise || error) {
    console.log(error);
    return;
  }

  const data: TResultData[] = [];

  for (let i = 0; i < usersPromise.length; i++) {
    const cookie = await serializeCookies(usersPromise[i].ltoken_v2, usersPromise[i].ltuid_v2);

    const res = await fetch(cookie);
    console.log(res);

    // const [promise, error] = await handlePromise(res);

    // if (error) {
    //   console.log(error);
    //   continue;
    // }
  }
}

async function fetch(cookie: string) {
  const header = new Headers();

  if (!cookie) {
    return;
  }

  header.set("accept", "application/json, text/plain, */*");
  header.set("accept-encoding", "gzip, deflate, br, zstd");
  header.set("accept-language", "en-US,en;q=0.9,id;q=0.8,zh-CN;q=0.7,zh;q=0.6");
  header.set("content-type", "application/json;charset=UTF-8");
  header.set("origin", "https://act.hoyolab.com");
  header.set("referer", "https://act.hoyolab.com");
  header.set(
    "user-agent",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
  );
  header.set("cookie", cookie);

  const data: any[] = [];

  for (const endpoint of Endpoints) {
    const url = new URL(endpoint.url);
    const actId = url.searchParams.get("act_id");

    const res = await ofetch<TData>(endpoint.url, {
      method: "POST",
      headers: header,
      body: {
        lang: "en-us",
        act_id: actId,
      },
    });
    data.push({ res, game: endpoint.game });
  }

  return data;
}

async function serializeCookies(ltoken_v2: string, ltuid_v2: string) {
  let concatCookie = "";
  concatCookie += `ltoken_v2=${ltoken_v2}; ltuid_v2=${ltuid_v2}`;

  return concatCookie;
}
