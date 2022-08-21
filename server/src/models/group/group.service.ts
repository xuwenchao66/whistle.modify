import { Injectable } from '@nestjs/common';
import { getUUID } from '../../common/helpers';
import { GroupEntity } from './group.entity';
import { GroupDto } from './group.dto';
import groupDB from '../../database/group';
import ruleDB from '../../database/rule';

@Injectable()
export class GroupService {
  async create(groupDto: GroupDto): Promise<GroupEntity> {
    const group = new GroupEntity();

    group.id = await getUUID();
    group.name = groupDto.name;

    await groupDB.create(group);

    return group;
  }

  async delete(id: string) {
    await groupDB.delete(id);
    // 删除该 group 下的所有 rule
    const rules = await ruleDB.findAll({ groupId: id });
    rules.forEach((rule) => ruleDB.delete(rule.id));
  }

  async update(id: string, groupDto: GroupDto) {
    return groupDB.update(id, groupDto);
  }

  async findAll(): Promise<GroupEntity[]> {
    const groups = [...(await groupDB.findAll())];
    return groups;
  }

  async findOne(id: string): Promise<GroupEntity> {
    return groupDB.findOne(id);
  }
}
