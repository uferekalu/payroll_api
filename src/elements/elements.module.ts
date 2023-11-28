import { Module } from '@nestjs/common';
import { ElementsController } from './elements.controller';
import { ElementsService } from './elements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from 'src/entities/elements.entity';
import { Lookups } from 'src/entities/lookups.entity';
import { Lookupvalues } from 'src/entities/lookupvalues.entity';
import { Elementlinks } from 'src/entities/elementlinks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Element, Lookups, Lookupvalues, Elementlinks]),
  ],
  controllers: [ElementsController],
  providers: [ElementsService],
})
export class ElementsModule {}
