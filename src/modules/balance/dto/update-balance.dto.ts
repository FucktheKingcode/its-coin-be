import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBalanceDto {
  @ApiProperty()
  @IsNotEmpty()
  amount_tap: number;

  @ApiProperty()
  @IsNotEmpty()
  typeTransaction: string;

  @ApiProperty()
  @IsNotEmpty()
  booster: number;

  @ApiProperty()
  @IsNotEmpty()
  tap_power_level: number;

  @ApiProperty()
  @IsNotEmpty()
  tap_bot: number;
}
