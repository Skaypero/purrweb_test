import { ApiProperty } from '@nestjs/swagger';
import type { UUID } from 'crypto';

export class AddResponse {
  @ApiProperty({
    description: 'Идентификатор созданного ресурса',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  private id: UUID;

  constructor(id: UUID) {
    this.id = id;
  }
}
