import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from 'src/entities/grade.entity';
import { GradeStep } from 'src/entities/gradesteps.entity';
import { Repository } from 'typeorm';
import { CreateGradeDto } from './dto/createGradeDto';
import { IGradestep } from 'src/gradesteps/interface/gradestep';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    @InjectRepository(GradeStep)
    private readonly gradestepRepository: Repository<GradeStep>,
  ) {}
  async findOne(id: number) {
    return await this.gradeRepository.findOne({ where: { id: id } });
  }

  async create(createGradeDto: CreateGradeDto) {
    const data = this.gradeRepository.create(createGradeDto);
    return await this.gradeRepository.save(data);
  }

  async findAll(): Promise<Array<Grade>> {
    return this.gradeRepository.find();
  }

  async getGradesteps(id: number): Promise<Array<IGradestep>> {
    const grade = await this.gradeRepository.findOneBy({ id: id });

    if (!grade) {
      throw new HttpException(
        'Grade not found. Cannot get gradesteps',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.gradestepRepository.find({
      where: { grade },
      relations: ['grade'],
    });

    const data = Promise.all(
      result.map(async (res) => {
        const { createdAt, name, amount, description, id } = res;
        const resultData = {
          createdAt,
          name,
          amount,
          description,
          id,
          gradeId: grade.id,
        };
        return resultData;
      }),
    );

    return data;
  }

  async getGradeStepById(gradeId: number, id: number): Promise<IGradestep> {
    const grade = await this.gradeRepository.findOneBy({ id: gradeId });
    const gradestep = await this.gradestepRepository.findOneBy({ id: id });

    if (!grade) {
      throw new HttpException(
        'Grade not found. Cannot get grade step',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!gradestep) {
      throw new HttpException('Grade step not found', HttpStatus.BAD_REQUEST);
    }

    const result = await this.gradestepRepository.findOne({
      where: { id: id, grade: grade },
      relations: ['grade'],
    });

    if (!result) {
      throw new HttpException('Grade step not found', HttpStatus.BAD_REQUEST);
    }

    const resultData = {
      createdAt: result.createdAt,
      name: result.name,
      amount: result.amount,
      description: result.description,
      id: result.id,
      gradeId: grade.id,
    };

    return resultData;
  }
}
