import request from '@/utils/request';
import { AxiosRequestConfig } from 'axios';
import { Rule } from '@server/src/models/rules/rule.type';

export const getRules = async (options?: AxiosRequestConfig) =>
  await request.get<Rule[]>('/rules', options);

export const updateRule = async (id: Rule['id'], data: Partial<Rule>) =>
  await request.put<Rule>(`rules/${id}`, data);

export const deleteRule = async (id: Rule['id']) =>
  await request.delete(`rules/${id}`);
