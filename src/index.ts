/*
 * @Author: lucklin 
 * @Email: 502763576@qq.com 
 * @Date: 2022-11-03 22:51:47 
 * @Last Modified time: 2022-11-03 23:33:39
 */
import createFetch from './raw'

const _globalThis = (function () {
  if (typeof globalThis !== 'undefined') {
    return globalThis
  }
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  throw new Error('unable to locate global object')
})()

const fetch = _globalThis.fetch || (() => Promise.reject(new Error('[fetch] fetch is not supported!')))

const Headers = _globalThis.Headers

const ourFetch = createFetch({ fetch, Headers })

export { ourFetch as default }
