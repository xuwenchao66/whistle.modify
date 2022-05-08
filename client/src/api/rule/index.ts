import request from '@/utils/request';
import { AxiosRequestConfig } from 'axios';
import { Rule } from '@server/src/models/rules/rule.type';

export const getRules = async (options: AxiosRequestConfig) =>
  await request.get<{ data: Rule[] }>('/rules', options);
