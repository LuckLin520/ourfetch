import { FetchContext, FetchRequest, FetchResponse, ResponseType } from './types'

export function isEmptyURL(url: string) {
  return !url || url === '/'
}
export const payloadMethod = new Set(Object.freeze(['PATCH', 'POST', 'PUT', 'DELETE']))
export const isPayloadMethod = (method = 'GET') => {
  return payloadMethod.has(method.toUpperCase())
}
export const mergeUrl = (path: string, url: string) => {
  if (isEmptyURL(path) || isEmptyURL(url)) return path || url
  path = path.startsWith('/') ? path : `/${path}`
  const { origin, search } = new URL(url)
  return origin.concat(path).concat(search)
}
export const mergePrams = (url: string, query: Record<string, any>) => {
  const { search } = new URL(url)
  const querySearch = Object.keys(query).reduce((o, n) => `${o}${!o && search ? '&' : '?'}${n}=${query[n]}`, '')
  return url.concat(querySearch)
}
export const isString = (val: any) => (Object.prototype.toString.call(val) === '[object String]' ? true : false)
export const isNumber = (val: any) => (Object.prototype.toString.call(val) === '[object Number]' ? true : false)
export const isObject = (val: any) => (Object.prototype.toString.call(val) === '[object Object]' ? true : false)
export const getResponseTypeAbbr = (type: string): ResponseType => {
  const contentType = type.split(';').shift()
  if (!type || /^application\/(?:[\w!#$%&*`\-.^~]*\+)?json(;.+)?$/i.test(contentType!)) {
    return 'json'
  }
  if (contentType === 'application/octet-stream') {
    return 'stream'
  }
  return 'text'
}
export class FetchError<T = any> extends Error {
  name = 'FetchError'
  request?: FetchRequest
  response?: FetchResponse<T>
  data?: T
  status?: number
  statusText?: string
  constructor({ request, response, error }: FetchContext) {
    let message = ''
    if (error) {
      message = `${error.message} (${message})`
    } else if (request && response) {
      message = `${response.status} ${response.statusText} (${request.toString()})`
    }
    super(message)
    this.request = request
    this.response = response
    this.data = response?._data
    this.status = response?.status
    this.statusText = response?.statusText
  }
}
