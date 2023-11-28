import { Module } from '@nestjs/common';
import { GradestepsController } from './gradesteps.controller';
import { GradestepsService } from './gradesteps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeStep } from 'src/entities/gradesteps.entity';
import { Grade } from 'src/entities/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GradeStep, Grade])],
  controllers: [GradestepsController],
  providers: [GradestepsService],
})
export class GradestepsModule {}
