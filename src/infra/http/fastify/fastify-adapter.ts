import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
// import { schedulerRoutes } from '@/infra/http/routes/scheduler/routes'
import fastify, {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify'
import fs from 'fs'
import path from 'path'

import type { HttpMethods } from '@/core/types/http-methods.js'
import { env } from '@/infra/env/index.js'

import type { HttpRequest } from '../http-request.js'
import type { HttpResponse } from '../http-response.js'
import type { HttpServer } from '../http-server.js'
import { FastifyHttpRequestAdapter } from './fastify-http-request-adapter.js'
import { FastifyHttpResponseAdapter } from './fastify-http-response-adapter.js'

export class FastifyAdapter implements HttpServer {
  app: FastifyInstance

  constructor() {
    this.app = fastify()
  }

  start(port: number, callback: () => void) {
    // this.app.register(schedulerRoutes) 

    // this.app.listen(
    //   {
    //     host: '0.0.0.0',
    //     port,
    //   },
    //   callback,
    // )
    this.app.register(fastifyCors, {
      origin: env.FRONTEND_URL,
      credentials: true,
    })

    this.app.register(fastifyMultipart, {
      attachFieldsToBody: true, // Campos de formulário são anexados ao corpo
      limits: {
        fileSize: 5 * 1024 * 1024 * 1024, // Limite de 5GB
      },
      onFile: async (part) => {
        const filePath = path.join(__dirname, 'uploads', part.filename)

        fs.mkdirSync(path.dirname(filePath), { recursive: true })

        await new Promise<void>((resolve, reject) => {
          const writeStream = fs.createWriteStream(filePath)
          part.file.pipe(writeStream)

          writeStream.on('finish', () => resolve())
          writeStream.on('error', reject)
        })

        console.log(`Arquivo ${part.filename} salvo em ${filePath}`)
      },
    })

    this.app.register(fastifyJwt, {
      secret: env.JWT_SECRET,
      sign: {
        expiresIn: '1h',
      },
    })

    this.app.register(fastifyCookie, {})

    this.app.listen(
      {
        host: '0.0.0.0',
        port,
      },
      callback,
    )
  }

  async close() {
    await this.app.close()
  }

  register(
    method: HttpMethods,
    url: string,
    handler: (
      request: HttpRequest,
      reply: HttpResponse,
    ) => Promise<HttpResponse>,
    verifyJwt?: boolean,
  ) {
    this.app[method](
      url,
      async (request: FastifyRequest, reply: FastifyReply) => {
        const wrappedRequest = new FastifyHttpRequestAdapter(request)
        const wrappedResponse = new FastifyHttpResponseAdapter(reply)

        if (verifyJwt === true) {
          const isJwtValid = await this.verifyJwt(wrappedRequest)

          if (!isJwtValid) {
            return wrappedResponse
              .status(401)
              .json({ message: 'Não autorizado.' })
          }
        }

        return await handler(wrappedRequest, wrappedResponse)
      },
    )
  }

  async verifyJwt(request: HttpRequest) {
    try {
      await request.jwtVerify()
    } catch (error) {
      return false
    }

    return true
  }


  signJwt(
    sub: string,
  ) {
    const tokenExpiresIn = '1h'

    const token = this.app.jwt.sign(
      {
        sub,
      },
      { expiresIn: tokenExpiresIn },
    )

    return {
      token,
    }
  }
}
