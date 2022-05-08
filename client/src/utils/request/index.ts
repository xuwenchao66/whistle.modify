import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { transformsSuccessData } from './interceptors/response';

export interface Response<D> {
  data: D;
}
export interface Request extends AxiosInstance {
  get<T = any, R = Response<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  delete<T = any, R = Response<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  post<T = any, R = Response<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  put<T = any, R = Response<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
}

const request: Request = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

request.interceptors.response.use(transformsSuccessData);

export default request;
