import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// login
export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
