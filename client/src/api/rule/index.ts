import request from '@/utils/request';
import { AxiosRequestConfig } from 'axios';
import { Rule } from '@server/src/models/rule/rule.type';

export const createRule = async (data: Partial<Rule>) =>
  await request.post<Rule>(`rules`, data);

export const deleteRule = async (id: Rule['id']) =>
  await request.delete(`rules/${id}`);

export const updateRule = async (id: Rule['id'], data: Partial<Rule>) =>
  await request.put<Rule>(`rules/${id}`, data);

export const getRules = async (options?: AxiosRequestConfig) =>
  await request.get<Rule[]>('/rules', options);
