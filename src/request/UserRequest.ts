import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRequest {
  @ApiProperty({ description: 'Имя пользователя', example: 'Ivan' })
  @IsNotEmpty()
  @MaxLength(30)
  username: string;

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
