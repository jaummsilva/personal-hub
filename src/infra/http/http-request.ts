/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequest {
  get body(): object | undefined
  get query(): {
    [key: string]: string
  }
  get headers(): Record<string, string | undefined>
  get params(): {
    [key: string]: string
  }
  get user(): {
    sub: string
  }

  jwtVerify(): Promise<void>
  files(): Promise<File[] | undefined>
  parts(): Promise<AsyncIterableIterator<any>>
}
