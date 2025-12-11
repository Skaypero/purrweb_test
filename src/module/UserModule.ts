import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/UserController';
import { Cards } from 'src/model/Cards';
import { Columns } from 'src/model/Columns';
import { Comments } from 'src/model/Comments';
import { Users } from 'src/model/Users';
import { UserService } from 'src/service/UserService';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Columns, Cards, Comments])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
