import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from 'src/entities/grade.entity';
import { GradeStep } from 'src/entities/gradesteps.entity';
import { Repository } from 'typeorm';
import { CreateGradeStepDto } from './dto/createGradeStepDto';
import { UpdateGradeStepDto } from './dto/updateGradeStepDto';

@Injectable()
export class GradestepsService {
  constructor(
    @InjectRepository(GradeStep)
    private readonly gradestepRepository: Repository<GradeStep>,
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  async findOne(id: number) {
    return this.gradestepRepository.findOne({
      where: { id: id },
      relations: ['grade'],
    });
  }

  async create(gradeId: number, createGradeStepDto: CreateGradeStepDto) {
    const grade = await this.gradeRepository.findOneBy({
      id: gradeId,
    });

    if (!grade) {
      throw new HttpException(
        'Grade not found. Cannot create Gradestep',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newGradestep = this.gradestepRepository.create({
      ...createGradeStepDto,
      grade,
    });

    return await this.gradestepRepository.save(newGradestep);
  }

  async updateGradestep(id: number, updateGradestepDto: UpdateGradeStepDto) {
    await this.gradestepRepository.update({ id }, { ...updateGradestepDto });
  }

  async findAll(): Promise<Array<GradeStep>> {
    return this.gradestepRepository.find({
      relations: ['grade'],
    });
  }

  async deleteGradestep(id: number) {
    await this.gradestepRepository.delete({ id });
  }
}
