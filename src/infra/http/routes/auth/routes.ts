import type { HttpServer } from '@/infra/http/http-server'
import { ZodAuthenticateBodySchemaValidation } from '@/infra/validation/zod/auth/zod-authenticate-body-schema-validation.ts'

import { AuthenticateController } from '../../controllers/auth/authenticate'

export class AuthRoutes {
  constructor(private httpServer: HttpServer) {}

  async init() {
    const zodAuthenticateBodySchemaValidation =
      new ZodAuthenticateBodySchemaValidation()
    const authenticateController = new AuthenticateController(
      this.httpServer,
      zodAuthenticateBodySchemaValidation,
    )

    this.httpServer.register(
      'post',
      '/auth',
      authenticateController.handle.bind(authenticateController),
    )
  }
}
