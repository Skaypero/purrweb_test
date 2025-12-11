import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import type { UUID } from 'crypto';

export class CardRequest {
  @ApiProperty({
    description: 'Заголовок карточки',
    example: 'Тестовый заголовок',
  })
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'Идентификатор колонки',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @IsNotEmpty()
  @IsUUID()
  columnId: UUID;
}
