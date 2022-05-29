import { Injectable } from '@nestjs/common';
import { getUUID } from '../../common/helpers';
import { GroupEntity } from './group.entity';
import { GroupDto } from './group.dto';
import { groupDB } from '../../database';

@Injectable()
export class GroupService {
  async create(groupDto: GroupDto): Promise<GroupEntity> {
    const group = new GroupEntity();

    group.id = await getUUID();
    group.name = groupDto.name;

    groupDB.create(group);

    return group;
  }

  async delete(id: string) {
    return groupDB.delete(id);
  }

  async update(id: string, groupDto: GroupDto) {
    return groupDB.update(id, groupDto);
  }

  async findAll(): Promise<GroupEntity[]> {
    const rules = [...groupDB.findAll()];

    rules.reverse();

    return rules;
  }

  async findOne(id: string): Promise<GroupEntity> {
    return groupDB.findOne(id);
  }
}
