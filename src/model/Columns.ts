import type { UUID } from 'crypto';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Users } from './Users';
import { Cards } from './Cards';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Columns {
  @ApiProperty({
    description: 'Идентификатор колонки',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @PrimaryColumn()
  id: UUID;

  @ApiProperty({
    description: 'Заголовок колонки',
    example: 'Тестовый заголовок',
  })
  @Column()
  title: string;

  @ManyToOne(() => Users, (user) => user.columns)
  user: Users;

  @OneToMany(() => Cards, (card) => card.column)
  cards: Cards[];

  constructor(id: UUID, title: string, user: Users) {
    this.id = id;
    this.title = title;
    this.user = user;
  }
}
