import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsIn, IsString, ValidateIf } from 'class-validator';
import { PaginateDto } from 'src/common/dtos/paginate.dto';

export class GetRankDto extends OmitType(PaginateDto, ['sort']) {
  @ApiPropertyOptional({ type: String, required: false })
  @ValidateIf((o) => o.sort !== undefined)
  @IsString()
  @IsIn(['high'])
  sort?: string;
}
