import type { UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cards } from './Cards';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comments {
  @ApiProperty({
    description: 'Идентификатор комментария',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @PrimaryColumn()
  id: UUID;

  @ApiProperty({
    description: 'Описание комментария',
    example: 'Тестовое описание',
  })
  @Column()
  description: string;

  @ManyToOne(() => Cards, (card) => card.comments, {
    onDelete: 'CASCADE',
  })
  card: Cards;

  constructor(id: UUID, description: string, card: Cards) {
    this.id = id;
    this.description = description;
    this.card = card;
  }
}
