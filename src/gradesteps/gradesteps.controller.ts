import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GradestepsService } from './gradesteps.service';
import { CreateGradeStepDto } from './dto/createGradeStepDto';
import { GradeStep } from 'src/entities/gradesteps.entity';
import { UpdateGradeStepDto } from './dto/updateGradeStepDto';

@Controller('gradesteps')
export class GradestepsController {
  constructor(private readonly gradestepsService: GradestepsService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.gradestepsService.findOne(id);
  }

  @Post(':gradeId')
  async create(
    @Param('gradeId', ParseIntPipe) gradeId: number,
    @Body() createGradeStepDto: CreateGradeStepDto,
  ) {
    return await this.gradestepsService.create(gradeId, createGradeStepDto);
  }

  @Get()
  findAll(): Promise<Array<GradeStep>> {
    return this.gradestepsService.findAll();
  }

  @Put(':id')
  updateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGradeStepDto: UpdateGradeStepDto,
  ) {
    return this.gradestepsService.updateGradestep(id, updateGradeStepDto);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id', ParseIntPipe) id: number) {
    await this.gradestepsService.deleteGradestep(id);
  }
}
