import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/.*[a-zA-Z].*/, { message: 'Password must contain at least one letter' })
  @Matches(/.*\d.*/, { message: 'Password must contain at least one number' })
  @Matches(/.*[!@#$%^&*(),.?":{}|<>].*/, { message: 'Password must contain at least one special character' })
  password: string;
}
