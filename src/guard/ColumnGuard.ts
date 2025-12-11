import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ColumnService } from 'src/service/ColumnService';

@Injectable()
export class ColumnGuard implements CanActivate {
  constructor(private columnService: ColumnService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.sub;
    const columnId = request.params.id;

    const columns = await this.columnService.getColumnsByUserId(userId);

    if (!columns) {
      throw new UnauthorizedException();
    }

    if (columns.filter((elem) => elem.id === columnId).length > 0) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
