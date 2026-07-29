/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FastifyRequest } from 'fastify'

import type { HttpRequest } from '../http-request'

export class FastifyHttpRequestAdapter implements HttpRequest {
  private req: FastifyRequest

  constructor(req: FastifyRequest) {
    this.req = req
  }

  get body(): object | undefined {
    return this.req.body as object | undefined
  }

  get headers(): Record<string, string | undefined> {
    return this.req.headers as Record<string, string | undefined>
  }

  get query(): { [key: string]: string } {
    return this.req.query as { [key: string]: string }
  }

  get params(): { [key: string]: string } {
    return this.req.params as { [key: string]: string }
  }

  get user(): {
    sub: string
  } {
    return this.req.user
  }

  async jwtVerify(): Promise<void> {
    await this.req.jwtVerify()
  }

  async files(): Promise<File[] | undefined> {
    const file = await this.req.files()
    if (file) {
      return file as unknown as File[]
    }
    return undefined
  }

  async parts(): Promise<AsyncIterableIterator<any>> {
    const partsIterator = this.req.parts()
    if (Symbol.asyncIterator in partsIterator) {
      return partsIterator
    } else {
      throw new Error('O método parts não retornou um AsyncIterableIterator.')
    }
  }
}
