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

export class CreateHackathonDto {
  @IsString()
  @MinLength(3)
  name: string;

  @Type(() => Date)
  @IsDate()
  @MinDate(() => new Date(), { message: "Start date must be in the future" })
  startDate: string;

  @Type(() => Date)
  @IsDate()
  @MinDate(() => new Date(), { message: "End date must be in the future" })
  endDate: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
