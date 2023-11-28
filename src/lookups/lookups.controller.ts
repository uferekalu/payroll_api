import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LookupsService } from './lookups.service';
import { CreatelookupsDto } from './dto/createLookupsDto';
import { Lookups } from 'src/entities/lookups.entity';

@Controller('lookups')
export class LookupsController {
  constructor(private readonly lookupsService: LookupsService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.lookupsService.findOne(id);
  }

  @Post()
  create(@Body() createLookupsDto: CreatelookupsDto) {
    return this.lookupsService.create(createLookupsDto);
  }

  @Get()
  findAll(): Promise<Array<Lookups>> {
    return this.lookupsService.findAll();
  }

  @Get('/:id/lookupvalues')
  getLookupvalues(@Param('id') id: number) {
    return this.lookupsService.getLookupvalues(id);
  }

  @Get('/:lookupId/lookupvalues/:id')
  getLookupvaluesById(
    @Param('lookupId') lookupId: number,
    @Param('id') id: number,
  ) {
    return this.lookupsService.getLookupvaluesById(lookupId, id);
  }
}
