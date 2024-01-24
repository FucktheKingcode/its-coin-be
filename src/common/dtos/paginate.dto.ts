import { ESortOption } from '../enum/index';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString, ValidateIf } from 'class-validator';

export class PaginateDto {
  @ApiPropertyOptional({ type: Number, required: false })
  @ValidateIf((o) => o.page !== undefined)
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ type: Number, required: false })
  @ValidateIf((o) => o.limit !== undefined)
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({ type: String, enum: ESortOption, required: false })
  @IsOptional()
  @IsEnum(ESortOption, { message: 'value of sort must be newest or oldest' })
  sort?: string;

  @ApiPropertyOptional({ type: Number, required: false })
  @ValidateIf((o) => o.offset !== undefined)
  @IsNumberString()
  offset?: string;

  @ApiPropertyOptional({ type: String, required: false })
  @IsOptional()
  @IsString()
  search?: string;
}
