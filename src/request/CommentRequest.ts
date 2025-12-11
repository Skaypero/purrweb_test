import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import type { UUID } from 'crypto';

export class CommentRequest {
  @ApiProperty({
    description: 'Описание комментария',
    example: 'Тестовое описание',
  })
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    description: 'Идентификатор карточки',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @IsNotEmpty()
  @IsUUID()
  cardId: UUID;
}
