import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { Base } from './db';
import { GroupEntity } from '../models/group/group.entity';
import { DEFAULT_GROUP_ID } from '../common/constants';

const prefix = '/groups';

export class GroupDB extends Base {
  async findIndexById(id: string): Promise<number> {
    const index = await this.db.getIndex(prefix, id);
    if (index === -1) throw new NotFoundException('Group Not Found');
    return index;
  }

  async create(group: GroupEntity) {
    return this.db.push(`${prefix}[]`, group);
  }

  async delete(id: string) {
    if (id === DEFAULT_GROUP_ID)
      throw new ForbiddenException('Default group cannot be deleted');

    const index = await this.findIndexById(id);
    return this.db.delete(`${prefix}[${index}]`);
  }

  async update(id: string, group: Partial<GroupEntity>) {
    const index = await this.findIndexById(id);
    await this.db.push(`${prefix}[${index}]`, group, false);

    return this.findOne(id);
  }

  async findAll() {
    const groups = await this.db.getObject<GroupEntity[]>(prefix);
    return groups;
  }

  async findOne(id: string): Promise<GroupEntity> {
    const index = await this.findIndexById(id);
    return this.db.getObject<GroupEntity>(`${prefix}[${index}]`);
  }
}

export default new GroupDB();
