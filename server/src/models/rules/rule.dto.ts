import { IsDefined, IsBoolean, IsString } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  @IsDefined()
  pattern: string;
}

export class UpdateRuleDto {
  @IsString()
  pattern: string;
  @IsBoolean()
  enable: boolean;
}
