import { Module } from '@nestjs/common';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from 'src/entities/grade.entity';
import { GradeStep } from 'src/entities/gradesteps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, GradeStep])],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
