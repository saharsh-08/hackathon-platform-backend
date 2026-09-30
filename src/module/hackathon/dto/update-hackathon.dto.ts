import {
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsDate,
  MinDate,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

export class UpdateHackathonDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @MinDate(() => new Date(), { message: "Start date must be in the future" })
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @MinDate(() => new Date(), { message: "End date must be in the future" })
  endDate?: Date;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
