import { IsString, Length } from 'class-validator';

export class GroupDto {
  @IsString()
  @Length(1, 20)
  name: string;
}
