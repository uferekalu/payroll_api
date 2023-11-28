import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { LookupvaluesService } from './lookupvalues.service';
import { CreateLookupvaluesDto } from './dto/createLookupvaluesDto';
import { Lookupvalues } from 'src/entities/lookupvalues.entity';
import { UpdateLookupValuesDto } from './dto/updateLookupValueDto';

@Controller('lookupvalues')
export class LookupvaluesController {
  constructor(private readonly lookupvaluesServices: LookupvaluesService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.lookupvaluesServices.findOne(id);
  }

  @Post(':lookupId')
  async create(
    @Param('lookupId', ParseIntPipe) lookupId: number,
    @Body() createLookupvaluesDto: CreateLookupvaluesDto,
  ) {
    return await this.lookupvaluesServices.create(
      lookupId,
      createLookupvaluesDto,
    );
  }

  @Get()
  findAll(): Promise<Array<Lookupvalues>> {
    return this.lookupvaluesServices.findAll();
  }

  @Put(':id')
  updateBookingById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLookupvaluesDto: UpdateLookupValuesDto,
  ) {
    return this.lookupvaluesServices.updateLookupvalue(
      id,
      updateLookupvaluesDto,
    );
  }

  @Delete(':id')
  async deleteLookupvaluesById(@Param('id', ParseIntPipe) id: number) {
    await this.lookupvaluesServices.deleteLookupvalue(id);
  }
}
