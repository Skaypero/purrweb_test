import { Module } from '@nestjs/common';
import { LoginController } from '../controller/LoginController';
import { LoginService } from '../service/LoginService';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/Constants';
import { UserModule } from './UserModule';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
