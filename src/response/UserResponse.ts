import { ApiProperty } from '@nestjs/swagger';
import type { UUID } from 'crypto';

export class UserResponse {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  private id: UUID;

  @ApiProperty({ description: 'Имя пользователя', example: 'Ivan' })
  private username: string;

  @ApiProperty({
    description: 'Адрес электронной почты',
    example: 'ivan@gmail.com',
  })
  private email: string;

  @ApiProperty({ description: 'Пароль', example: 'ivannov45' })
  private createdAt: string;

  constructor(id: UUID, username: string, email: string, createdAt: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.createdAt = createdAt;
  }
}
