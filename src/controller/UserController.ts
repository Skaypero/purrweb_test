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
} from '@nestjs/common';
import { UserService } from 'src/service/UserService';
import { UserRequest } from 'src/request/UserRequest';
import { AddResponse } from 'src/response/AddResponse';
import type { UUID } from 'crypto';
import { UserResponse } from 'src/response/UserResponse';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Columns } from 'src/model/Columns';
import { Cards } from 'src/model/Cards';
import { Comments } from 'src/model/Comments';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: AddResponse,
  })
  async addUser(@Body() userRequest: UserRequest): Promise<AddResponse> {
    const user = await this.userService.addUser(userRequest);
    return new AddResponse(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор пользователя',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserResponse,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  async getUserById(@Param('id') id: UUID): Promise<UserResponse> {
    try {
      const user = await this.userService.getUserById(id);
      return new UserResponse(
        user.id,
        user.username,
        user.email,
        user.createdAt,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id/columns')
  @ApiOperation({ summary: 'Получение колонок пользователя' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор пользователя',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Columns,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  async getUserColumns(@Param('id') id: UUID): Promise<Columns[]> {
    try {
      const columns = await this.userService.getUserColumns(id);
      return columns;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id/columns/:columnId/cards')
  @ApiOperation({ summary: 'Получение карточек пользователя' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор пользователя',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiParam({
    name: 'columnId',
    required: true,
    description: 'Идентификатор колонки',
    example: 'efa2bcb0-13d6-4912-80dc-b61a03fe8316',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Cards,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  async getUserCards(
    @Param('id') id: UUID,
    @Param('columnId') columnId: UUID,
  ): Promise<Cards[]> {
    try {
      const cards = await this.userService.getUserCards(id, columnId);
      return cards;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id/columns/:columnId/cards/:cardId/comments')
  @ApiOperation({ summary: 'Получение комментариев пользователя' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор пользователя',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiParam({
    name: 'columnId',
    required: true,
    description: 'Идентификатор колонки',
    example: 'efa2bcb0-13d6-4912-80dc-b61a03fe8316',
  })
  @ApiParam({
    name: 'cardId',
    required: true,
    description: 'Идентификатор карточки',
    example: '586bfaa2-0a99-47c6-a52f-88e4af899879',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Comments,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  async getUserComments(
    @Param('id') id: UUID,
    @Param('columnId') columnId: UUID,
    @Param('cardId') cardId: UUID,
  ): Promise<Comments[]> {
    try {
      const comments = await this.userService.getUserComments(
        id,
        columnId,
        cardId,
      );
      return comments;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Редактирование пользователя' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор пользователя',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async editUser(@Body() userRequest: UserRequest, @Param('id') id: UUID) {
    this.userService.editUser(userRequest, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор пользователя',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async deleteUser(@Param('id') id: UUID) {
    this.userService.deleteUser(id);
  }
}
