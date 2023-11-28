import { Module } from '@nestjs/common';
import { LookupsController } from './lookups.controller';
import { LookupsService } from './lookups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lookupvalues } from 'src/entities/lookupvalues.entity';
import { Lookups } from 'src/entities/lookups.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lookups, Lookupvalues])],
  controllers: [LookupsController],
  providers: [LookupsService],
})
export class LookupsModule {}
