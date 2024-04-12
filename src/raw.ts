import type { CreateFetchOptions, FetchContext, OurFetch, Raw } from './types'
import { FetchError, getResponseTypeAbbr, isNumber, isObject, isPayloadMethod, isString, mergeParams, mergeUrl } from './utils'

const createFetch = (globalOptions: CreateFetchOptions) => {
  const { fetch, Headers, defaults } = globalOptions
  const raw: Raw = async (request, options = {}) => {
    const ctx: FetchContext = {
      request,
      options: { ...defaults, ...options },
      response: void 0,
      error: void 0
    }

    if (ctx.options.onRequest) {
      await ctx.options.onRequest(ctx)
    }

    if (typeof ctx.request === 'string') {
      try {
        ctx.request = mergeUrl(ctx.request, ctx.options.baseURL || '')
        ctx.request = mergeParams(ctx.request, ctx.options.query || {})

        ctx.options.headers = new Headers(ctx.options.headers)
        if (!ctx.options.headers.has('accept')) {
          ctx.options.headers.set('accept', 'application/json')
        }
        if (!(ctx.options.body instanceof FormData) && ctx.options.body && isPayloadMethod(ctx.options.method)) {
          if (!ctx.options.headers.has('content-type')) {
            ctx.options.headers.set('content-type', 'application/json')
          } else if (ctx.options.headers.get('content-type')?.includes('www-form-urlencoded')) {
            ctx.options.body = isObject(ctx.options.body) ? new URLSearchParams(ctx.options.body as any).toString() : ctx.options.body
          }
          ctx.options.body = isString(ctx.options.body) ? ctx.options.body : JSON.stringify(ctx.options.body)
        }
      } catch (error) {
        void 0
      }
    }

    let fetchPromise = null
    if (isNumber(ctx.options.timeout)) {
      const controller = ctx.options.controller || new AbortController()
      ctx.options.signal = controller.signal
      const timeoutPromise: Promise<Response> = new Promise(resolve => {
        setTimeout(() => {
          resolve(new Response('timeout', { status: 504, statusText: 'timeout ' }))
          controller.abort()
        }, ctx.options.timeout)
      })
      fetchPromise = Promise.race([timeoutPromise, fetch(ctx.request, ctx.options as RequestInit)])
    }

    ctx.response = await (fetchPromise || fetch(ctx.request, ctx.options as RequestInit)).catch(async error => {
      ctx.error = error
      if (ctx.options.onRequestError) {
        await ctx.options.onRequestError(ctx as any)
      }
      throw ctx.error
    })

    const responseType = ctx.options.responseType || getResponseTypeAbbr(ctx.response.headers.get('content-type') || '')

    if (responseType === 'json') {
      ctx.response._data = await ctx.response.json()
    } else if (responseType === 'stream') {
      ctx.response._data = ctx.response.body
    } else {
      ctx.response._data = await ctx.response[responseType]()
    }

    if (!ctx.response.ok) {
      ctx.error = new FetchError(ctx)
      if (ctx.options.onResponseError) {
        await ctx.options.onResponseError(ctx as any)
      }
      throw ctx.error
    }

    if (ctx.options.onResponse) {
      await ctx.options.onResponse(ctx as any)
    }

    return ctx.options.onlyData ? ctx.response._data : ctx.response
  }

  const ourFetch = ((request, opts) => raw(request, opts)) as OurFetch

  ourFetch.create = (defaultOptions = {}) =>
    createFetch({
      ...globalOptions,
      defaults: {
        ...defaultOptions
      }
    })
  Object.defineProperty(ourFetch, 'name', { value: 'ourFetch' })
  Object.defineProperty(ourFetch.create, 'name', { value: 'ourFetchCreate' })

  ourFetch.get = (request, opts) => ourFetch(request, { ...opts, method: 'GET' })
  ourFetch.put = (request, opts) => ourFetch(request, { ...opts, method: 'PUT' })
  ourFetch.post = (request, opts) => ourFetch(request, { ...opts, method: 'POST' })
  ourFetch.patch = (request, opts) => ourFetch(request, { ...opts, method: 'PATCH' })
  ourFetch.delete = (request, opts) => ourFetch(request, { ...opts, method: 'DELETE' })

  return ourFetch
}
export default createFetch