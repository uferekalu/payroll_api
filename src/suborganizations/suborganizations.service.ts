import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Suborganizations } from 'src/entities/suborganizations.entity';
import { Repository } from 'typeorm';
import { CreateSuborganizationDto } from './dto/createSuborganizationDto';
import { Department } from 'src/entities/department.entity';
import { ISuborganization } from './interface/suborganization';

@Injectable()
export class SuborganizationsService {
  constructor(
    @InjectRepository(Suborganizations)
    private readonly suborganizationsRepository: Repository<Suborganizations>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async findOne(id: number) {
    return await this.suborganizationsRepository.findOne({ where: { id: id } });
  }

  async create(createSuborganizationDto: CreateSuborganizationDto) {
    const data = this.suborganizationsRepository.create(
      createSuborganizationDto,
    );
    return await this.suborganizationsRepository.save(data);
  }

  async findAll(): Promise<Array<Suborganizations>> {
    return this.suborganizationsRepository.find();
  }

  async getDepartments(id: number): Promise<Array<ISuborganization>> {
    const suborganization = await this.suborganizationsRepository.findOneBy({
      id: id,
    });

    if (!suborganization) {
      throw new HttpException(
        'Suborganization not found. Cannot get Departments',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.departmentRepository.find({
      where: { suborganization },
      relations: ['suborganization'],
    });

    const data = Promise.all(
      result.map(async (res) => {
        const { createdAt, name, note, id, suborganization } = res;
        const resultData = {
          createdAt,
          name,
          note,
          id,
          suborganizationId: suborganization.id,
        };
        return resultData;
      }),
    );

    return data;
  }

  async getDepartmentById(
    suborganizationId: number,
    id: number,
  ): Promise<ISuborganization> {
    const suborganization = await this.suborganizationsRepository.findOneBy({
      id: suborganizationId,
    });
    const department = await this.departmentRepository.findOneBy({ id: id });

    if (!suborganization) {
      throw new HttpException(
        'Suborganization not found. Cannot get department',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!department) {
      throw new HttpException('Department not found', HttpStatus.BAD_REQUEST);
    }

    const result = await this.departmentRepository.findOne({
      where: { id: id, suborganization: suborganization },
      relations: ['suborganization'],
    });

    if (!result) {
      throw new HttpException('Department not found', HttpStatus.BAD_REQUEST);
    }

    const resultData = {
      createdAt: result.createdAt,
      name: result.name,
      note: result.note,
      id: result.id,
      suborganizationId: suborganization.id,
    };

    return resultData;
  }
}
