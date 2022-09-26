import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRepositoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  createTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  status: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  idTribe: number;
}
