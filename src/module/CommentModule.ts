import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/model/Comments';
import { CardModule } from './CardModule';
import { CommentController } from 'src/controller/CommentController';
import { CommentService } from 'src/service/CommentService';

@Module({
  imports: [CardModule, TypeOrmModule.forFeature([Comments])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
