import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnController } from 'src/controller/ColumnController';
import { Columns } from 'src/model/Columns';
import { ColumnService } from 'src/service/ColumnService';
import { UserModule } from './UserModule';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Columns])],
  controllers: [ColumnController],
  providers: [ColumnService],
  exports: [ColumnService],
})
export class ColumnModule {}
