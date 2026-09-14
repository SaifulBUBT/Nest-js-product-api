import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;
}
