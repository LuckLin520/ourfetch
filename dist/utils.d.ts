import { FetchContext, FetchRequest, FetchResponse, ResponseType } from './types';
export declare function isEmptyURL(url: string): boolean;
export declare const payloadMethod: Set<string>;
export declare const isPayloadMethod: (method?: string) => boolean;
export declare const mergeUrl: (path: string, url: string) => string;
export declare const mergePrams: (url: string, query: Record<string, any>) => string;
export declare const isString: (val: any) => boolean;
export declare const isNumber: (val: any) => boolean;
export declare const isObject: (val: any) => boolean;
export declare const getResponseTypeAbbr: (type: string) => ResponseType;
export declare class FetchError<T = any> extends Error {
    name: string;
    request?: FetchRequest;
    response?: FetchResponse<T>;
    data?: T;
    status?: number;
    statusText?: string;
    constructor({ request, response, error }: FetchContext);
}
