import { IsEmail, IsOptional, IsString } from 'class-validator';

export class PatchCustomerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;
}
