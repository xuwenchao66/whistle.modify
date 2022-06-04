import { IsString, Length, IsDefined } from 'class-validator';

export class GroupDto {
  @IsString()
  @Length(1, 20)
  @IsDefined()
  name: string;
}
