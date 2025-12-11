import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { Comments } from 'src/model/Comments';
import { CardService } from './CardService';
import { CommentRequest } from 'src/request/CommentRequest';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,
    private cardService: CardService,
  ) {}

  async addComment(commentRequest: CommentRequest): Promise<Comments> {
    const card = await this.cardService.getCardById(commentRequest.cardId);

    const commentData = new Comments(
      crypto.randomUUID(),
      commentRequest.description,
      card!,
    );

    const comment = this.commentRepository.create(commentData);

    return this.commentRepository.save(comment);
  }

  async getCommentsByUserId(userId: UUID): Promise<Comments[]> {
    const comments = await this.commentRepository.find({
      where: {
        card: {
          column: {
            user: {
              id: userId,
            },
          },
        },
      },
    });

    if (!comments) {
      throw new Error('Такого пользователя не существует!');
    }

    return comments;
  }

  async getCommentById(id: UUID): Promise<Comments> {
    const comment = await this.commentRepository.findOneBy({ id });

    if (!comment) {
      throw new Error('Такого комментария не существует!');
    }

    return comment;
  }

  async editComment(commentRequest: CommentRequest, commentId: UUID) {
    await this.commentRepository.update(commentId, {
      description: commentRequest.description,
    });
  }

  async deleteComment(commentId: UUID) {
    await this.commentRepository.delete({ id: commentId });
  }
}
