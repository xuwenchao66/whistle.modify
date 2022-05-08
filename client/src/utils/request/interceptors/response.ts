import { AxiosResponse } from 'axios';

export const transformsSuccessData = (response: AxiosResponse) => {
  return response?.data;
};
