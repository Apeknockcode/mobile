import { AxiosRequestConfig, AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";

// AxiosResponse 类型
export interface AxiosResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: AxiosRequestConfig<D>;
    request?: any;
}

// Result 类型
export interface Result<T = any> {
    code: number,
    message: string,
    data: T
}