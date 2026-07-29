import { env } from "./infra/env";
import { FastifyAdapter } from "./infra/http/fastify/fastify-adapter";
import type { HttpServer } from "./infra/http/http-server";
import { AuthRoutes } from "./infra/http/routes/auth/routes";
import { CategoryRoutes } from "./infra/http/routes/category/routes";
import { UserRoutes } from "./infra/http/routes/user/routes";

export default class App {
  private httpServer: HttpServer;
  constructor() {
    this.httpServer = new FastifyAdapter();
  }

  async start() {
    await new UserRoutes(this.httpServer).init();
    await new AuthRoutes(this.httpServer).init();
    await new CategoryRoutes(this.httpServer).init();

    this.httpServer.start(env.PORT, () => {
      console.log("HTTP Running!");
    });
  }

  async close() {
    this.httpServer.close();
  }

  get instance() {
    return this.httpServer.app;
  }
}

export const app = new App();

app.start();
