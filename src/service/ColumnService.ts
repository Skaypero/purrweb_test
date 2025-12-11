import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Columns } from 'src/model/Columns';
import { ColumnRequest } from 'src/request/ColumnRequest';
import { Repository } from 'typeorm';
import { UserService } from './UserService';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Columns)
    private columnRepository: Repository<Columns>,
    private userService: UserService,
  ) {}

  async addColumn(
    columnRequest: ColumnRequest,
    userId: UUID,
  ): Promise<Columns> {
    const user = await this.userService.getUserById(userId);

    const columnData = new Columns(
      crypto.randomUUID(),
      columnRequest.title,
      user!,
    );

    const column = this.columnRepository.create(columnData);

    return this.columnRepository.save(column);
  }

  async getColumnsByUserId(userId: UUID): Promise<Columns[]> {
    const columns = await this.columnRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!columns) {
      throw new Error('Такого пользователя не существует!');
    }

    return columns;
  }

  async getColumnById(id: UUID): Promise<Columns> {
    const column = await this.columnRepository.findOneBy({ id });

    if (!column) {
      throw new Error('Такой колонки не существует!');
    }

    return column;
  }

  async editColumn(columnRequest: ColumnRequest, columnId: UUID) {
    await this.columnRepository.update(columnId, {
      title: columnRequest.title,
    });
  }

  async deleteColumn(columnId: UUID) {
    await this.columnRepository.delete({ id: columnId });
  }
}
