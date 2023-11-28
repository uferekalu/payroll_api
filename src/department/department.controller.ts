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
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/createDepartmentDto';
import { Department } from 'src/entities/department.entity';
import { UpdateDepartmentDto } from './dto/updateDepartmentDto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.departmentService.findOne(id);
  }

  @Post(':suborganizationId')
  async create(
    @Param('suborganizationId', ParseIntPipe) suborganizationId: number,
    @Body() createDepartmentDto: CreateDepartmentDto,
  ) {
    return await this.departmentService.create(
      suborganizationId,
      createDepartmentDto,
    );
  }

  @Get()
  findAll(): Promise<Array<Department>> {
    return this.departmentService.findAll();
  }

  @Put(':id')
  updateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.updateDepartment(id, updateDepartmentDto);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id', ParseIntPipe) id: number) {
    await this.departmentService.deleteDepartment(id);
  }
}
