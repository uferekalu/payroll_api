import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SuborganizationsService } from './suborganizations.service';
import { CreateSuborganizationDto } from './dto/createSuborganizationDto';
import { Suborganizations } from 'src/entities/suborganizations.entity';

@Controller('suborganizations')
export class SuborganizationsController {
  constructor(
    private readonly suborganizationsService: SuborganizationsService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.suborganizationsService.findOne(id);
  }

  @Post()
  create(@Body() createSuborganizationDto: CreateSuborganizationDto) {
    return this.suborganizationsService.create(createSuborganizationDto);
  }

  @Get()
  findAll(): Promise<Array<Suborganizations>> {
    return this.suborganizationsService.findAll();
  }

  @Get('/:id/departments')
  getDepartments(@Param('id') id: number) {
    return this.suborganizationsService.getDepartments(id);
  }

  @Get('/:suborganizationId/departments/:id')
  getDepartmentById(
    @Param('suborganizationId') suborganizationId: number,
    @Param('id') id: number,
  ) {
    return this.suborganizationsService.getDepartmentById(
      suborganizationId,
      id,
    );
  }
}
