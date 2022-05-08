import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { transformsSuccessData } from './interceptors/response';

export interface Request extends AxiosInstance {
  get<R, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<R, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<R, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  put<R, D = any>(
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
