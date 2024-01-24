import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateQuestDto {
  @ApiProperty({ example: 'Quest 1' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Quest 1 description' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  readonly reward: number;
}
