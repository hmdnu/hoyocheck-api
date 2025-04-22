import { ofetch } from "ofetch";
import { Endpoints } from "../constant";

export type Response = {
  data: any;
  message: string | null;
  retcode: number | null;
  game: string | null;
};

export default class HttpRequest {
  private makeHeaders(cookie: string, game: string) {
    const header = new Headers();
    header.set("accept", "application/json, text/plain, */*");
    header.set("accept-encoding", "gzip, deflate, br, zstd");
    header.set("accept-language", "en-US,en;q=0.9,id;q=0.8,zh-CN;q=0.7,zh;q=0.6");
    header.set("content-type", "application/json;charset=UTF-8");
    header.set("origin", "https://act.hoyolab.com");
    header.set("referer", "https://act.hoyolab.com");
    header.set("x-rpc-signgame", game);
    header.set(
      "user-agent",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    );
    header.set("cookie", cookie);

    return header;
  }

  async fetch(token: string, id: string) {
    const responses: Response[] = [];
    const cookie = `ltoken_v2=${token}; ltuid_v2=${id}`;

    for (const endpoint of Endpoints) {
      const response = ofetch<Response>(endpoint.url, {
        method: "POST",
        headers: this.makeHeaders(cookie, endpoint.game),
        body: {
          lang: "en-us",
          act_id: new URL(endpoint.url).searchParams.get("act_id"),
        },
      });

      const { res, error } = await this.wrapPromise(response);

      if (error && error instanceof Error) {
        responses.push({ data: null, game: endpoint.game, message: error.message, retcode: null });
      }

      if (res) {
        responses.push({ data: res.data, message: res.message, game: endpoint.game, retcode: res.retcode });
      }
    }

    return responses;
  }

  async wrapPromise<T>(promise: Promise<T>) {
    try {
      const data = await promise;
      return { res: data, error: null };
    } catch (error) {
      return { res: null, error };
    }
  }
}
