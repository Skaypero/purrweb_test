import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class ColumnRequest {
  @ApiProperty({
    description: 'Заголовок колонки',
    example: 'Тестовый заголовок',
  })
  @IsNotEmpty()
  @MaxLength(100)
  title: string;
}
