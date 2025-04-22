import { Env } from "./env";
import App from "./service/App";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const app = new App(env);
    app.routes();

    return app.getInstance().fetch(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
