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
import { CommentGuard } from 'src/guard/CommentGuard';
import { Comments } from 'src/model/Comments';
import { CommentRequest } from 'src/request/CommentRequest';
import { AddResponse } from 'src/response/AddResponse';
import { CommentService } from 'src/service/CommentService';

@ApiBearerAuth()
@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание комментария' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: AddResponse,
  })
  async addComment(
    @Body() commentRequest: CommentRequest,
  ): Promise<AddResponse> {
    const comment = await this.commentService.addComment(commentRequest);
    return new AddResponse(comment.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Получение комментария по id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор комментария',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Comments,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  async getCommentById(@Param('id') id: UUID): Promise<Comments> {
    try {
      const comment = await this.commentService.getCommentById(id);
      return new Comments(comment.id, comment.description, comment.card);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard, CommentGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Редактирование комментария' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор комментария',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async editComment(
    @Body() commentRequest: CommentRequest,
    @Param('id') id: UUID,
  ) {
    this.commentService.editComment(commentRequest, id);
  }

  @UseGuards(AuthGuard, CommentGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление комментария' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор комментария',
    example: '0789fe12-f4b5-40a8-a190-50185fa004c0',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async deleteComment(@Param('id') id: UUID) {
    this.commentService.deleteComment(id);
  }
}
