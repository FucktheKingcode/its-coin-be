import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsOptional } from 'class-validator';

export class UpgradeBasicDto {
  @ApiPropertyOptional({ description: 'Tap power', type: Number })
  @IsOptional()
  tap_power: number;

  @ApiPropertyOptional({ description: 'Energy limit', type: Number })
  @IsOptional()
  energy: number;

  @ApiPropertyOptional({ description: 'Recharging speed', type: Number })
  @IsOptional()
  recharging_speed: number;

  @ApiProperty({ description: 'price', type: Number })
  @IsDefined()
  price: number;
}
