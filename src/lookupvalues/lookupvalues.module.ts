import { Module } from '@nestjs/common';
import { LookupvaluesController } from './lookupvalues.controller';
import { LookupvaluesService } from './lookupvalues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lookupvalues } from 'src/entities/lookupvalues.entity';
import { Lookups } from 'src/entities/lookups.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lookupvalues, Lookups])],
  controllers: [LookupvaluesController],
  providers: [LookupvaluesService],
})
export class LookupvaluesModule {}
