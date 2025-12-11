import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentService } from 'src/service/CommentService';

@Injectable()
export class CommentGuard implements CanActivate {
  constructor(private commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.sub;
    const commentId = request.params.id;

    const comments = await this.commentService.getCommentsByUserId(userId);

    if (!comments) {
      throw new UnauthorizedException();
    }

    if (comments.filter((elem) => elem.id === commentId).length > 0) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
