import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { Base } from './db';
import { GroupEntity } from '../models/group/group.entity';
import { DEFAULT_GROUP_ID } from '../common/constants';

const prefix = '/groups';

export class GroupDB extends Base {
  findIndexById(id: string): number {
    const index = this.db.getIndex(prefix, id);
    if (index === -1) throw new NotFoundException('Group Not Found');
    return index;
  }

  create(group: GroupEntity) {
    this.db.push(`${prefix}[]`, group);
  }

  delete(id: string) {
    if (id === DEFAULT_GROUP_ID)
      throw new ForbiddenException('Default group cannot be deleted');

    const index = this.findIndexById(id);
    this.db.delete(`${prefix}[${index}]`);
  }

  update(id: string, group: Partial<GroupEntity>) {
    const index = this.findIndexById(id);
    this.db.push(`${prefix}[${index}]`, group, false);

    return this.findOne(id);
  }

  findAll() {
    const groups = this.db.getObject<GroupEntity[]>(prefix);
    return groups;
  }

  findOne(id: string): GroupEntity {
    const index = this.findIndexById(id);
    return this.db.getObject<GroupEntity>(`${prefix}[${index}]`);
  }
}

export default new GroupDB();
