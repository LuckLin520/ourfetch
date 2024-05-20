function t(t){return!t||"/"===t}const e=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));class o extends Error{name="FetchError";request;response;data;status;statusText;constructor({request:t,response:e,error:o}){let s="";o?s=`${o.message} (${s})`:t&&e&&(s=`${e.status} ${e.statusText} (${t.toString()})`),super(s),this.request=t,this.response=e,this.data=e?._data,this.status=e?.status,this.statusText=e?.statusText}}const s=r=>{const{fetch:n,Headers:a,defaults:i}=r,p=async(s,r={})=>{const p={request:s,options:{...i,...r},response:void 0,error:void 0};if(p.options.onRequest&&await p.options.onRequest(p),"string"==typeof p.request)try{p.request=((e,o)=>{if(t(e)||t(o))return e||o;e=e.startsWith("/")?e:`/${e}`;const{protocol:s,hostname:r,port:n,pathname:a,search:i}=new URL(o);return`${s}//${`${r}${n?":"+n:""}/${a+e}${i}`.replace(/\/+/,"/")}`})(p.request,p.options.baseURL||""),p.request=((t,e)=>{const o=new URL(t),s=new URLSearchParams(o.search);for(const t in e)void 0!==e[t]&&s.set(t,e[t]);return o.search=s.toString(),o.toString()})(p.request,p.options.query||{}),p.options.headers=new a(p.options.headers),p.options.headers.has("accept")||p.options.headers.set("accept","application/json"),p.options.body instanceof FormData||!p.options.body||!((t="GET")=>e.has(t.toUpperCase()))(p.options.method)||(p.options.headers.has("content-type")?p.options.headers.get("content-type")?.includes("www-form-urlencoded")&&(p.options.body=(c=p.options.body,"[object Object]"===Object.prototype.toString.call(c)?new URLSearchParams(p.options.body).toString():p.options.body)):p.options.headers.set("content-type","application/json"),p.options.body=(t=>"[object String]"===Object.prototype.toString.call(t))(p.options.body)?p.options.body:JSON.stringify(p.options.body))}catch(t){}var c;let u=null;if((t=>"[object Number]"===Object.prototype.toString.call(t))(p.options.timeout)){const t=p.options.controller||new AbortController;p.options.signal=t.signal;const e=new Promise((e=>{setTimeout((()=>{e(new Response("timeout",{status:504,statusText:"timeout "})),t.abort()}),p.options.timeout)}));u=Promise.race([e,n(p.request,p.options)])}p.response=await(u||n(p.request,p.options)).catch((async t=>{throw p.error=t,p.options.onRequestError&&await p.options.onRequestError(p),p.error}));const d=p.options.responseType||(t=>{const e=t.split(";").shift();return!t||/^application\/(?:[\w!#$%&*`\-.^~]*\+)?json(;.+)?$/i.test(e)?"json":"application/octet-stream"===e?"stream":"text"})(p.response.headers.get("content-type")||"");if(p.response._data="json"===d?await p.response.json():"stream"===d?p.response.body:await p.response[d](),!p.response.ok)throw p.error=new o(p),p.options.onResponseError&&await p.options.onResponseError(p),p.error;return p.options.onResponse&&await p.options.onResponse(p),p.options.onlyData?p.response._data:p.response},c=(t,e)=>p(t,e);return c.create=(t={})=>s({...r,defaults:{...t}}),Object.defineProperty(c,"name",{value:"ourFetch"}),Object.defineProperty(c.create,"name",{value:"ourFetchCreate"}),c.get=(t,e)=>c(t,{...e,method:"GET"}),c.put=(t,e)=>c(t,{...e,method:"PUT"}),c.post=(t,e)=>c(t,{...e,method:"POST"}),c.patch=(t,e)=>c(t,{...e,method:"PATCH"}),c.delete=(t,e)=>c(t,{...e,method:"DELETE"}),c},r=function(){if("undefined"!=typeof globalThis)return globalThis;if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;throw new Error("unable to locate global object")}(),n=r.fetch||(()=>Promise.reject(new Error("[fetch] fetch is not supported!"))),a=r.Headers,i=s({fetch:n,Headers:a});
/*
 * @Author: lucklin
 * @Email: 502763576@qq.com
 * @Date: 2022-11-03 22:51:47
 * @Last Modified time: 2022-11-03 23:33:39
 */export{i as default};
