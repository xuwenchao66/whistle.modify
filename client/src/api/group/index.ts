import request from '@/utils/request';
import { AxiosRequestConfig } from 'axios';
import { Group } from '@server/src/models/group/group.type';

export const createGroup = async (data: Partial<Group>) =>
  await request.post<Group>('groups', data);

export const deleteGroup = async (id: Group['id']) =>
  await request.delete(`groups/${id}`);

export const updateGroup = async (id: Group['id'], data: Partial<Group>) =>
  await request.put<Group>(`groups/${id}`, data);

export const getGroups = async (options?: AxiosRequestConfig) =>
  await request.get<Group[]>('/groups', options);
