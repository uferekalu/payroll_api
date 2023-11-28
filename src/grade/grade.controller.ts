import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/createGradeDto';
import { Grade } from 'src/entities/grade.entity';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.gradeService.findOne(id);
  }

  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradeService.create(createGradeDto);
  }

  @Get()
  findAll(): Promise<Array<Grade>> {
    return this.gradeService.findAll();
  }

  @Get('/:id/gradesteps')
  getGradesteps(@Param('id') id: number) {
    return this.gradeService.getGradesteps(id);
  }

  @Get('/:gradeId/gradesteps/:id')
  getGradeStepById(@Param('gradeId') gradeId: number, @Param('id') id: number) {
    return this.gradeService.getGradeStepById(gradeId, id);
  }
}
