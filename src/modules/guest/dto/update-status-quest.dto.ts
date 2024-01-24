import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateStatusQuestDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly userId: string;
}
