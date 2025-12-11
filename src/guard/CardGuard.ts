import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CardService } from 'src/service/CardService';

@Injectable()
export class CardGuard implements CanActivate {
  constructor(private cardService: CardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.sub;
    const cardId = request.params.id;

    const cards = await this.cardService.getCardsByUserId(userId);

    if (!cards) {
      throw new UnauthorizedException();
    }

    if (cards.filter((elem) => elem.id === cardId).length > 0) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
