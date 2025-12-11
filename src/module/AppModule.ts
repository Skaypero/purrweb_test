import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './LoginModule';
import { UserModule } from './UserModule';
import { Users } from 'src/model/Users';
import { ConfigModule } from '@nestjs/config';
import { Columns } from 'src/model/Columns';
import { ColumnModule } from './ColumnModule';
import { CardModule } from './CardModule';
import { Cards } from 'src/model/Cards';
import { Comments } from 'src/model/Comments';
import { CommentModule } from './CommentModule';

@Module({
  imports: [
    LoginModule,
    UserModule,
    ColumnModule,
    CardModule,
    CommentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test_password',
      database: 'purrweb_test',
      entities: [Users, Columns, Cards, Comments],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
