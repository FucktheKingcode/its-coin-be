import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateReferrerUser {
  @ApiPropertyOptional({ description: 'Referrer User', type: String })
  @IsOptional()
  id_referrer: string;
}
