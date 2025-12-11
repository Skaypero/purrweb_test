import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './UserService';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new Error('Ошибка авторизации!');
    }

    if (user.password !== password) {
      throw new Error('Неверные данные!');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return this.jwtService.signAsync(payload);
  }
}
