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
import { AuthGuard } from 'src/guard/AuthGuard';
import { CardGuard } from 'src/guard/CardGuard';
import { Cards } from 'src/model/Cards';
import { CardRequest } from 'src/request/CardRequest';
import { AddResponse } from 'src/response/AddResponse';
import { CardService } from 'src/service/CardService';

@ApiBearerAuth()
@ApiTags('Cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание карточки' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: AddResponse,
  })
  async addCard(@Body() cardRequest: CardRequest): Promise<AddResponse> {
    const card = await this.cardService.addCard(cardRequest);
    return new AddResponse(card.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Получение карточки по id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор карточки',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Cards })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  async getCardById(@Param('id') id: UUID): Promise<Cards> {
    try {
      const card = await this.cardService.getCardById(id);
      return new Cards(card.id, card.title, card.column);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard, CardGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Редактирование карточки' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор карточки',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async editCard(@Body() cardRequest: CardRequest, @Param('id') id: UUID) {
    this.cardService.editCard(cardRequest, id);
  }

  @UseGuards(AuthGuard, CardGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление карточки' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор карточки',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async deleteCard(@Param('id') id: UUID) {
    this.cardService.deleteCard(id);
  }
}
