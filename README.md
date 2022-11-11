# Installing
```
npm install ourfetch
```
# Using demo
```typescript
// http.ts
import ourFetch from 'ourfetch'
import { FetchContext, FetchOptions, FetchRequest } from 'ourfetch/dist/types'
import { downloadBlob } from './util'

interface ResponseSchema<T = any> {
  data: T
  msg: string
  code: number
  status: boolean
}
const defaultOptions: FetchOptions = {
  baseURL: 'http://127.0.0.1:3001',
  // timeout: 4000,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },
  onRequest(ctx) {
    console.log('[fetch onRequest]', ctx)
    ctx.options.headers = {
      ...ctx.options.headers,
      token: 'token123'
    }
  },
  onResponse(ctx) {
    console.log('[fetch onResponse]', ctx)
    if (ctx.response._data instanceof Blob) {
      const { _data, headers } = ctx.response
      const filename = decodeURIComponent(headers.get('content-disposition')!.split('filename=')[1])
      downloadBlob(_data, filename)
    }
    ctx.response = ctx.response._data // finally return ctx.response
  },
  onResponseError(ctx: FetchContext) {
    console.log('[fetch onResponseError]', ctx)
  },
  onRequestError(ctx: FetchContext) {
    console.log('[fetch onRequestError]', ctx)
  }
}

const myFetch = ourFetch.create(defaultOptions)

export const http = <T>(url: FetchRequest, options?: FetchOptions<ResponseSchema<T>>): Promise<ResponseSchema<T>> => {
  return myFetch(url, options)
}

export const get = <T>(url: FetchRequest, options?: FetchOptions<ResponseSchema<T>>): Promise<ResponseSchema<T>> => {
  return myFetch.get(url, options)
}
export const post = <T>(url: FetchRequest, options?: FetchOptions<ResponseSchema<T>>): Promise<ResponseSchema<T>> => {
  return myFetch.post(url, options)
}
// ...

// Page.tsx
type TestData = { test: string }
const params = { www: 123, aaa: 555 }
const res = await get<TestData>('/test', { query: params }) // The res is ResponseSchema<TestData>
await http<TestData>('/test', { query: params })
await post<TestData>('/test', { body: params })
await get('/download', { responseType: 'blob' })
```
# Request method aliases
ourFetch(url[, config)

axios.get(url[, config])

axios.put(url[, config])

axios.post(url[, config])

axios.patch(url[, config])

axios.delete(url[, config])
