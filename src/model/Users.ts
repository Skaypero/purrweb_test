import type { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Columns } from './Columns';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @PrimaryColumn()
  id: UUID;

  @ApiProperty({ description: 'Имя пользователя', example: 'Ivan' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: 'Адрес электронной почты',
    example: 'ivan@gmail.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Пароль', example: 'ivannov45' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Дата создания', example: '09.12.25' })
  @Column()
  createdAt: string;

  @OneToMany(() => Columns, (column) => column.user)
  columns: Columns[];

  constructor(
    id: UUID,
    username: string,
    email: string,
    password: string,
    createdAt: string,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }
}
