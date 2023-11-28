import { Module } from '@nestjs/common';
import { ElementlinksController } from './elementlinks.controller';
import { ElementlinksService } from './elementlinks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Elementlinks } from 'src/entities/elementlinks.entity';
import { Element } from 'src/entities/elements.entity';
import { Suborganizations } from 'src/entities/suborganizations.entity';
import { Lookups } from 'src/entities/lookups.entity';
import { Lookupvalues } from 'src/entities/lookupvalues.entity';
import { Department } from 'src/entities/department.entity';
import { Grade } from 'src/entities/grade.entity';
import { GradeStep } from 'src/entities/gradesteps.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Elementlinks,
      Element,
      Suborganizations,
      Lookups,
      Lookupvalues,
      Department,
      Grade,
      GradeStep,
    ]),
  ],
  controllers: [ElementlinksController],
  providers: [ElementlinksService],
})
export class ElementlinksModule {}
