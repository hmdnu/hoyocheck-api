import { Hono } from "hono";
import { Env } from "../env";
import Hoyolab from "./Hoyolab";
import { StatusCodes as http } from "http-status-codes";

export default class App {
  private hono = new Hono();
  private hoyolab = new Hoyolab();
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  routes() {
    this.hono.use("/*", async (c, next) => {
      const auth = c.req.header("Authorization");
      const token = auth?.split(" ")[1];

      if (!auth) {
        return c.text("Token required", http.UNAUTHORIZED);
      }

      if (token !== this.env.API_TOKEN) {
        return c.text("Unauthorize acsess", http.UNAUTHORIZED);
      }

      await next();
    });

    this.hono.get("/", (c) => c.text("hello"));
    this.hono.get("/check", async (c) => {
      const token = c.req.query("token");
      const uid = c.req.query("uid");

      if (!token || !uid) {
        return c.text("query not provided");
      }

      const response = await this.hoyolab.check(token, uid);

      return c.json(response);
    });
  }

  getInstance() {
    return this.hono;
  }
}
