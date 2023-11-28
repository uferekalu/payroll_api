import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Suborganizations } from 'src/entities/suborganizations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Suborganizations])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
