import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { UUID } from 'crypto';
import type { Request } from 'express';
import { AuthGuard } from 'src/guard/AuthGuard';
import { ColumnGuard } from 'src/guard/ColumnGuard';
import { Columns } from 'src/model/Columns';
import { ColumnRequest } from 'src/request/ColumnRequest';
import { AddResponse } from 'src/response/AddResponse';
import { ColumnService } from 'src/service/ColumnService';

@ApiBearerAuth()
@ApiTags('Columns')
@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание колонки' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: AddResponse,
  })
  async addColumn(
    @Body() columnRequest: ColumnRequest,
    @Req() req: Request,
  ): Promise<AddResponse> {
    const column = await this.columnService.addColumn(
      columnRequest,
      req['user'].sub,
    );
    return new AddResponse(column.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Получение колонки по id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор колонки',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Columns })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  async getColumnById(@Param('id') id: UUID): Promise<Columns> {
    try {
      const column = await this.columnService.getColumnById(id);
      return new Columns(column.id, column.title, column.user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard, ColumnGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Редактирование колонки' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор колонки',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async editColumn(
    @Body() columnRequest: ColumnRequest,
    @Param('id') id: UUID,
  ) {
    this.columnService.editColumn(columnRequest, id);
  }

  @UseGuards(AuthGuard, ColumnGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление колонки' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор колонки',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async deleteColumn(@Param('id') id: UUID) {
    this.columnService.deleteColumn(id);
  }
}
