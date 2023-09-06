![banner.png](https://github.com/LuckLin520/ourfetch/blob/master/banner.jpg)

# Example

```typescript
// http.ts
import ourfetch from "ourfetch";
import { FetchContext, FetchOptions, FetchRequest } from "ourfetch/dist/types";

const defaultOptions: FetchOptions = {
  baseURL: "http://127.0.0.1:3001",
  onRequest(ctx) {
    console.log("[fetch onRequest]", ctx);
  },
  onResponse(ctx) {
    console.log("[fetch onResponse]", ctx);
  },
  onResponseError(ctx: FetchContext) {
    console.log("[fetch onResponseError]", ctx);
  },
  onRequestError(ctx: FetchContext) {
    console.log("[fetch onRequestError]", ctx);
  },
};

const myFetch = ourfetch.create(defaultOptions);

export default myFetch;
```

### Creating an instance

You can create a new instance of axios with a custom config.

```js
const instance = ourfetch.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
```

# Installing

Using npm:

```bash
$ npm install axios
```

Using bower:

```bash
$ bower install axios
```

Using yarn:

```bash
$ yarn add axios
```

Using pnpm:

```bash
$ pnpm add axios
```

# Request method aliases

ourfetch(url[, config)

ourfetch.get(url[, config])

ourfetch.put(url[, config])

ourfetch.post(url[, config])

ourfetch.patch(url[, config])

ourfetch.delete(url[, config])
