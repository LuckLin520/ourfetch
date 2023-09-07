![banner.png](https://github.com/LuckLin520/ourfetch/blob/master/banner.jpg)

- 基于 HTML5 fetch 的二次封装
- 支持 Promise
- 支持自定义请求头
- 支持自定义请求参数
- 支持自定义响应结果
- 支持自定义拦截器
- 支持自定义错误处理
- 支持自定义超时
- 支持自定义请求上下文

🌟👉：[https://github.com/LuckLin520/ourfetch](https://github.com/LuckLin520/ourfetch)

# Example

```typescript
// http.ts
import ourfetch from "ourfetch";
import { FetchOptions } from "ourfetch/dist/types";

const defaultOptions: FetchOptions<CustomResult> = {
  baseURL: "http://127.0.0.1:3001",
  onRequest(ctx) {
    console.log("[fetch onRequest]", ctx);
  },
  onResponse(ctx) {
    console.log("[fetch onResponse]", ctx);
  },
  onResponseError(ctx) {
    console.log("[fetch onResponseError]", ctx);
  },
  onRequestError(ctx) {
    console.log("[fetch onRequestError]", ctx);
  },
};

const myFetch = ourfetch.create(defaultOptions);

export default myFetch;
```

### Creating an instance

You can create a new instance of axios with a custom config.

```typescript
const instance = ourfetch.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
```

# Installing

Using npm:

```bash
$ npm install ourfetch
```

Using bower:

```bash
$ bower install ourfetch
```

Using yarn:

```bash
$ yarn add ourfetch
```

Using pnpm:

```bash
$ pnpm add ourfetch
```

# Types

### Request Context

```typescript
export interface FetchContext<T = any> {
  request: FetchRequest;
  options: FetchOptions<T>;
  response?: FetchResponse<T>;
  error?: FetchError;
}
```

### Request Options

```typescript
export interface FetchOptions<T = any> extends Omit<RequestInit, "body"> {
  baseURL?: string;
  query?: Record<string, any>;
  body?: RequestInit["body"] | Record<string, any>;
  responseType?: ResponseType;
  onlyData?: boolean;
  timeout?: number;
  controller?: AbortController;
  extra?: Record<string, any>;
  onRequest?(ctx: FetchContext): Promise<void> | void;
  onRequestError?(
    ctx: FetchContext & { error: FetchError }
  ): Promise<void> | void;
  onResponse?(
    ctx: FetchContext & { response: FetchResponse<T> }
  ): Promise<void> | void;
  onResponseError?(
    ctx: FetchContext & { response: FetchResponse<T> }
  ): Promise<void> | void;
}
```

For more information, see the corresponding `types.ts` file.

# Request method aliases

ourfetch(url[, config)

ourfetch.get(url[, config])

ourfetch.put(url[, config])

ourfetch.post(url[, config])

ourfetch.patch(url[, config])

ourfetch.delete(url[, config])
