import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/createDepartmentDto';
import { Suborganizations } from 'src/entities/suborganizations.entity';
import { UpdateDepartmentDto } from './dto/updateDepartmentDto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Suborganizations)
    private readonly suborganizationRepository: Repository<Suborganizations>,
  ) {}

  async findOne(id: number) {
    return this.departmentRepository.findOne({
      where: { id: id },
      relations: ['suborganization'],
    });
  }

  async create(
    suborganizationId: number,
    createDepartmentDto: CreateDepartmentDto,
  ) {
    const suborganization = await this.suborganizationRepository.findOneBy({
      id: suborganizationId,
    });

    if (!suborganization) {
      throw new HttpException(
        'Suborganization not found. Cannot create Department',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newDepartment = this.departmentRepository.create({
      ...createDepartmentDto,
      suborganization,
    });

    return await this.departmentRepository.save(newDepartment);
  }

  async updateDepartment(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    await this.departmentRepository.update({ id }, { ...updateDepartmentDto });
  }

  async findAll(): Promise<Array<Department>> {
    return this.departmentRepository.find({
      relations: ['suborganization'],
    });
  }

  async deleteDepartment(id: number) {
    await this.departmentRepository.delete({ id });
  }
}
