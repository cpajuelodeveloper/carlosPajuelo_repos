import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  status: number;
}
