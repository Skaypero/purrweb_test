import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from 'src/controller/CardController';
import { Cards } from 'src/model/Cards';
import { CardService } from 'src/service/CardService';
import { ColumnModule } from './ColumnModule';

@Module({
  imports: [ColumnModule, TypeOrmModule.forFeature([Cards])],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
