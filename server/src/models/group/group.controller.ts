import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupDto } from './group.dto';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body() createGroupDto: GroupDto) {
    return await this.groupService.create(createGroupDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.groupService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGroupDto: GroupDto) {
    return await this.groupService.update(id, updateGroupDto);
  }

  @Get()
  async findAll() {
    return await this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.groupService.findOne(id);
  }
}
