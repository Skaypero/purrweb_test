import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Cards } from 'src/model/Cards';
import { Columns } from 'src/model/Columns';
import { Comments } from 'src/model/Comments';
import { Users } from 'src/model/Users';
import { UserRequest } from 'src/request/UserRequest';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private columnRepository: Repository<Columns>,
    @InjectRepository(Cards)
    private cardRepository: Repository<Cards>,
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,
  ) {}

  addUser(userRequest: UserRequest): Promise<Users> {
    const userData = new Users(
      crypto.randomUUID(),
      userRequest.username,
      userRequest.email,
      userRequest.password,
      new Date().toLocaleDateString(),
    );

    const user = this.userRepository.create(userData);

    return this.userRepository.save(user);
  }

  async getUserById(id: UUID): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('Такого пользователя не существует!');
    }

    return user;
  }

  async getUserColumns(id: UUID): Promise<Columns[]> {
    const columns = await this.columnRepository.find({
      where: {
        user: {
          id,
        },
      },
    });

    if (!columns) {
      throw new Error('Такого пользователя не существует!');
    }

    return columns;
  }

  async getUserCards(id: UUID, columnId: UUID): Promise<Cards[]> {
    const cards = await this.cardRepository.find({
      where: {
        column: {
          id: columnId,
          user: {
            id,
          },
        },
      },
    });

    if (!cards) {
      throw new Error('Такого пользователя или колонки не существует!');
    }

    return cards;
  }

  async getUserComments(
    id: UUID,
    columnId: UUID,
    cardId: UUID,
  ): Promise<Comments[]> {
    const comments = await this.commentRepository.find({
      where: {
        card: {
          id: cardId,
          column: {
            id: columnId,
            user: {
              id,
            },
          },
        },
      },
    });

    if (!comments) {
      throw new Error(
        'Такого пользователя, колонки или карточки не существует!',
      );
    }

    return comments;
  }

  async getUserByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new Error('Такого пользователя не существует!');
    }

    return user;
  }

  async editUser(userRequest: UserRequest, userId: UUID) {
    await this.userRepository.update(userId, {
      username: userRequest.username,
      email: userRequest.email,
      password: userRequest.password,
    });
  }

  async deleteUser(userId: UUID) {
    this.userRepository.delete({ id: userId });
  }
}
