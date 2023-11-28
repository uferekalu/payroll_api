import { Module } from '@nestjs/common';
import { SuborganizationsController } from './suborganizations.controller';
import { SuborganizationsService } from './suborganizations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suborganizations } from 'src/entities/suborganizations.entity';
import { Department } from 'src/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suborganizations, Department])],
  controllers: [SuborganizationsController],
  providers: [SuborganizationsService],
})
export class SuborganizationsModule {}
