import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { Cards } from 'src/model/Cards';
import { CardRequest } from 'src/request/CardRequest';
import { ColumnService } from './ColumnService';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Cards)
    private cardRepository: Repository<Cards>,
    private columnService: ColumnService,
  ) {}

  async addCard(cardRequest: CardRequest): Promise<Cards> {
    const column = await this.columnService.getColumnById(cardRequest.columnId);

    const cardData = new Cards(crypto.randomUUID(), cardRequest.title, column!);

    const card = this.cardRepository.create(cardData);

    return this.cardRepository.save(card);
  }

  async getCardsByUserId(userId: UUID): Promise<Cards[]> {
    const cards = await this.cardRepository.find({
      where: {
        column: {
          user: {
            id: userId,
          },
        },
      },
    });

    if (!cards) {
      throw new Error('Такого пользователя не существует!');
    }

    return cards;
  }

  async getCardById(id: UUID): Promise<Cards> {
    const card = await this.cardRepository.findOneBy({ id });

    if (!card) {
      throw new Error('Такой карточки не существует!');
    }

    return card;
  }

  async editCard(cardRequest: CardRequest, cardId: UUID) {
    await this.cardRepository.update(cardId, {
      title: cardRequest.title,
    });
  }

  async deleteCard(cardId: UUID) {
    await this.cardRepository.delete({ id: cardId });
  }
}
