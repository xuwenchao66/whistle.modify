import {
  IsDefined,
  IsBoolean,
  IsString,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

// why use @Type? see https://github.com/typestack/class-validator/issues/83

export class ResponseDto {
  @IsString()
  body: string;
}

export class ReplacerDto {
  @ValidateNested()
  @IsObject()
  @Type(() => ResponseDto)
  response: ResponseDto;
}

export class UpdateRuleDto {
  @IsString()
  pattern: string;
  @IsBoolean()
  enable: boolean;
  @ValidateNested()
  @Type(() => ReplacerDto)
  replacer: ReplacerDto;
}

export class CreateRuleDto extends UpdateRuleDto {
  @IsDefined()
  pattern: string;
}
