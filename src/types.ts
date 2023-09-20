import { FetchError } from './utils'

export interface ResponseMap {
  json: string
  blob: Blob
  text: string
  arrayBuffer: ArrayBuffer
  stream: ReadableStream<Uint8Array>
}
export type ResponseType = keyof ResponseMap
export interface CreateFetchOptions {
  defaults?: FetchOptions
  fetch: typeof globalThis.fetch
  Headers: typeof Headers
}
export type FetchRequest = RequestInfo
export interface FetchResponse<T> extends Response {
  _data?: T
}
export interface FetchContext<T = any> {
  request: FetchRequest
  options: FetchOptions<T>
  response?: FetchResponse<T>
  error?: FetchError
}
export interface FetchOptions<T = any> extends Omit<RequestInit, 'body'> {
  baseURL?: string
  query?: Record<string, any>
  body?: RequestInit['body'] | Record<string, any>
  responseType?: ResponseType
  onlyData?: boolean
  timeout?: number
  controller?: AbortController
  extra?: Record<string, any>,
  onRequest?(ctx: FetchContext<T>): Promise<void> | void
  onRequestError?(ctx: FetchContext<T> & { error: FetchError }): Promise<void> | void
  onResponse?(ctx: FetchContext<T> & { response: FetchResponse<T> }): Promise<void> | void
  onResponseError?(ctx: FetchContext<T> & { response: FetchResponse<T> }): Promise<void> | void
}
export type Raw = <T>(request: FetchRequest, options?: FetchOptions<T>) => Promise<FetchResponse<T>>

export interface OurFetch {
  <T>(request: FetchRequest, options?: FetchOptions<T>): Promise<T>
  create(defaults: FetchOptions): OurFetch
  get<T>(request: FetchRequest, options?: Omit<FetchOptions<T>, 'body'>): Promise<T>
  put<T>(request: FetchRequest, options?: FetchOptions<T>): Promise<T>
  post<T>(request: FetchRequest, options?: FetchOptions<T>): Promise<T>
  patch<T>(request: FetchRequest, options?: FetchOptions<T>): Promise<T>
  delete<T>(request: FetchRequest, options?: FetchOptions<T>): Promise<T>
}