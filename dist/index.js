function e(e){return!e||"/"===e}const t=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));class o extends Error{name="FetchError";request;response;data;status;statusText;constructor({request:e,response:t,error:o}){let s="";o?s=`${o.message} (${s})`:e&&t&&(s=`${t.status} ${t.statusText} (${e.toString()})`),super(s),this.request=e,this.response=t,this.data=t?._data,this.status=t?.status,this.statusText=t?.statusText}}const s=n=>{const{fetch:r,Headers:a,defaults:i}=n,p=async(s,n={})=>{const p={request:s,options:{...i,...n},response:void 0,error:void 0};if(p.options.onRequest&&await p.options.onRequest(p),"string"==typeof p.request)try{p.request=((t,o)=>{if(e(t)||e(o))return t||o;t=t.startsWith("/")?t:`/${t}`;const{origin:s,search:n}=new URL(o);return s.concat(t).concat(n)})(p.request,p.options.baseURL||""),p.request=((e,t)=>{const{search:o}=new URL(e),s=Object.keys(t).reduce(((e,s)=>`${e}${e||o?"&":"?"}${s}=${t[s]}`),"");return e.concat(s)})(p.request,p.options.query||{}),p.options.body&&((e="GET")=>t.has(e.toUpperCase()))(p.options.method)&&(p.options.headers=new a(p.options.headers),p.options.headers.has("content-type")?p.options.headers.get("content-type")?.includes("www-form-urlencoded")&&(p.options.body=(c=p.options.body,"[object Object]"===Object.prototype.toString.call(c)?new URLSearchParams(p.options.body).toString():p.options.body)):p.options.headers.set("content-type","application/json"),p.options.headers.has("accept")||p.options.headers.set("accept","application/json"),p.options.body=(e=>"[object String]"===Object.prototype.toString.call(e))(p.options.body)?p.options.body:JSON.stringify(p.options.body))}catch(e){}var c;let u=null;if((e=>"[object Number]"===Object.prototype.toString.call(e))(p.options.timeout)){const e=p.options.controller||new AbortController;p.options.signal=e.signal;const t=new Promise((t=>{setTimeout((()=>{t(new Response("timeout",{status:504,statusText:"timeout "})),e.abort()}),p.options.timeout)}));u=Promise.race([t,r(p.request,p.options)])}p.response=await(u||r(p.request,p.options)).catch((async e=>{throw p.error=e,p.options.onRequestError&&await p.options.onRequestError(p),p.error}));const d=p.options.responseType||(e=>{const t=e.split(";").shift();return!e||/^application\/(?:[\w!#$%&*`\-.^~]*\+)?json(;.+)?$/i.test(t)?"json":"application/octet-stream"===t?"stream":"text"})(p.response.headers.get("content-type")||"");if(p.response._data="json"===d?await p.response.json():"stream"===d?p.response.body:await p.response[d](),!p.response.ok)throw p.error=new o(p),p.options.onResponseError&&await p.options.onResponseError(p),p.error;return p.options.onResponse&&await p.options.onResponse(p),p.options.onlyData?p.response._data:p.response},c=(e,t)=>p(e,t);return c.create=(e={})=>s({...n,defaults:{...e}}),Object.defineProperty(c,"name",{value:"ourFetch"}),Object.defineProperty(c.create,"name",{value:"ourFetchCreate"}),c.get=(e,t)=>c(e,{...t,method:"GET"}),c.put=(e,t)=>c(e,{...t,method:"PUT"}),c.post=(e,t)=>c(e,{...t,method:"POST"}),c.patch=(e,t)=>c(e,{...t,method:"PATCH"}),c.delete=(e,t)=>c(e,{...t,method:"DELETE"}),c},n=function(){if("undefined"!=typeof globalThis)return globalThis;if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;throw new Error("unable to locate global object")}(),r=n.fetch||(()=>Promise.reject(new Error("[fetch] fetch is not supported!"))),a=n.Headers,i=s({fetch:r,Headers:a});
/*
 * @Author: lucklin
 * @Email: 502763576@qq.com
 * @Date: 2022-11-03 22:51:47
 * @Last Modified time: 2022-11-03 23:33:39
 */export{i as default};
