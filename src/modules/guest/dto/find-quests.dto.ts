import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, ValidateIf } from 'class-validator';
import { PaginateDto } from 'src/common/dtos/paginate.dto';

export class FindQuestsDto extends PaginateDto {
  @ApiPropertyOptional()
  @ValidateIf((o) => o.reward !== undefined)
  @IsNumberString()
  reward?: string;
}
