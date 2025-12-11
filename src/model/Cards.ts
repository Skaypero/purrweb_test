import type { UUID } from 'crypto';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Columns } from './Columns';
import { Comments } from './Comments';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cards {
  @ApiProperty({
    description: 'Идентификатор карточки',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @PrimaryColumn()
  id: UUID;

  @ApiProperty({
    description: 'Заголовок карточки',
    example: 'Тестовый заголовок',
  })
  @Column()
  title: string;

  @ManyToOne(() => Columns, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  column: Columns;

  @OneToMany(() => Comments, (comment) => comment.card)
  comments: Comments[];

  constructor(id: UUID, title: string, column: Columns) {
    this.id = id;
    this.title = title;
    this.column = column;
  }
}
