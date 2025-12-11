import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    description: 'Адрес электронной почты',
    example: 'ivan@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль', example: 'ivannov45' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
