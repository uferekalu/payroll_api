import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Elementlinks } from 'src/entities/elementlinks.entity';
import { Element } from 'src/entities/elements.entity';
import { Grade } from 'src/entities/grade.entity';
import { GradeStep } from 'src/entities/gradesteps.entity';
import { Lookups } from 'src/entities/lookups.entity';
import { Lookupvalues } from 'src/entities/lookupvalues.entity';
import { Suborganizations } from 'src/entities/suborganizations.entity';
import { Repository } from 'typeorm';
import { CreateElementLinkDto } from './dto/createElementLinkDto';
import { UpdateElementLinkDto } from './dto/updateElementLinkDto';
import { IElementLink } from './interface/elementLinks';

@Injectable()
export class ElementlinksService {
  constructor(
    @InjectRepository(Elementlinks)
    private readonly elementlinksRepository: Repository<Elementlinks>,
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    @InjectRepository(Suborganizations)
    private readonly suborganizationsRepository: Repository<Suborganizations>,
    @InjectRepository(Lookups)
    private readonly lookupsRepository: Repository<Lookups>,
    @InjectRepository(Lookupvalues)
    private readonly lookupvaluesRepository: Repository<Lookupvalues>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    @InjectRepository(GradeStep)
    private readonly gradestepRepository: Repository<GradeStep>,
  ) {}

  async findOne(id: number) {
    return this.elementlinksRepository.findOne({
      where: { id: id },
    });
  }

  async create(id: number, createElementLinkDto: CreateElementLinkDto) {
    const element = await this.elementRepository.findOne({
      where: { id: id },
    });

    const lookupvalues = await this.lookupvaluesRepository.find();
    const suborganizations = await this.suborganizationsRepository.find();
    const departments = await this.departmentRepository.find();
    const employeeCategory = await this.lookupsRepository.findOne({
      where: { name: 'Employee Category' },
    });
    const employeeType = await this.lookupsRepository.findOne({
      where: { name: 'Employee Type' },
    });
    const jobTitle = await this.lookupsRepository.findOne({
      where: { name: 'Job Title' },
    });
    const union = await this.lookupsRepository.findOne({
      where: { name: 'Union' },
    });

    const grade = await this.gradeRepository.find();
    const gradesteps = await this.gradestepRepository.find();

    if (!element) {
      throw new HttpException(
        'Element not found. Cannot create element link',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      createElementLinkDto.suborganizationId &&
      suborganizations.find(
        (value) => value.id === createElementLinkDto.suborganizationId,
      ) == null
    ) {
      throw new HttpException(
        'Suborganization Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      createElementLinkDto.departmentId &&
      departments.find(
        (value) => value.id === createElementLinkDto.departmentId,
      ) == null
    ) {
      throw new HttpException(
        'Department Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      createElementLinkDto.employeeCategoryId &&
      employeeCategory.id !== createElementLinkDto.employeeCategoryId
    ) {
      throw new HttpException(
        'Employee category Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      createElementLinkDto.employeeCategoryValueId &&
      lookupvalues.find(
        (value) => value.id === createElementLinkDto.employeeCategoryValueId,
      ) == null
    ) {
      throw new HttpException(
        'Employee category value Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      createElementLinkDto.employeeTypeId &&
      employeeType.id !== createElementLinkDto.employeeTypeId
    ) {
      throw new HttpException(
        'Employee type Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      createElementLinkDto.employeeTypeValueId &&
      lookupvalues.find(
        (value) => value.id === createElementLinkDto.employeeTypeValueId,
      ) == null
    ) {
      throw new HttpException(
        'Employee type value Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      createElementLinkDto.jobTitleId &&
      jobTitle.id !== createElementLinkDto.jobTitleId
    ) {
      throw new HttpException(
        'Job title Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      createElementLinkDto.grade &&
      grade.find((value) => value.id === createElementLinkDto.grade) == null
    ) {
      throw new HttpException('Grade does not exist', HttpStatus.BAD_REQUEST);
    }

    if (
      createElementLinkDto.gradeStep &&
      gradesteps.find((value) => value.id === createElementLinkDto.gradeStep) ==
        null
    ) {
      throw new HttpException(
        'Grade step does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      createElementLinkDto.unionId &&
      union.id !== createElementLinkDto.unionId
    ) {
      throw new HttpException(
        'Union Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newElementLink = this.elementlinksRepository.create({
      ...createElementLinkDto,
    });

    return await this.elementlinksRepository.save(newElementLink);
  }

  async updateElementLink(
    elementId: number,
    id: number,
    updateElementLinkDto: UpdateElementLinkDto,
  ) {
    const elementLink = await this.elementlinksRepository.findOne({
      where: { id: id, elementId: elementId },
    });

    await this.elementlinksRepository.update(
      { id },
      {
        name: updateElementLinkDto.name
          ? updateElementLinkDto.name
          : elementLink.name,
        suborganizationId: updateElementLinkDto.suborganizationId
          ? updateElementLinkDto.suborganizationId
          : elementLink.suborganizationId,
        locationId: updateElementLinkDto.locationId
          ? updateElementLinkDto.locationId
          : elementLink.locationId,
        departmentId: updateElementLinkDto.departmentId
          ? updateElementLinkDto.departmentId
          : elementLink.departmentId,
        employeeCategoryId: updateElementLinkDto.employeeCategoryId
          ? updateElementLinkDto.employeeCategoryId
          : elementLink.employeeCategoryId,
        employeeCategoryValueId: updateElementLinkDto.employeeCategoryValueId
          ? updateElementLinkDto.employeeCategoryValueId
          : elementLink.employeeCategoryValueId,
        employeeTypeId: updateElementLinkDto.employeeTypeId
          ? updateElementLinkDto.employeeTypeId
          : elementLink.employeeTypeId,
        employeeTypeValueId: updateElementLinkDto.employeeTypeValueId
          ? updateElementLinkDto.employeeTypeValueId
          : elementLink.employeeTypeValueId,
        jobTitleId: updateElementLinkDto.jobTitleId
          ? updateElementLinkDto.jobTitleId
          : elementLink.jobTitleId,
        grade: updateElementLinkDto.grade
          ? updateElementLinkDto.grade
          : elementLink.grade,
        gradeStep: updateElementLinkDto.gradeStep
          ? updateElementLinkDto.gradeStep
          : elementLink.gradeStep,
        unionId: updateElementLinkDto.unionId
          ? updateElementLinkDto.unionId
          : elementLink.unionId,
        amountType: updateElementLinkDto.amountType
          ? updateElementLinkDto.amountType
          : elementLink.amountType,
        amount: updateElementLinkDto.amount
          ? updateElementLinkDto.amount
          : elementLink.amount,
        rate: updateElementLinkDto.rate ? updateElementLinkDto.rate : 0,
        effectiveStartDate: updateElementLinkDto.effectiveStartDate
          ? updateElementLinkDto.effectiveStartDate
          : elementLink.effectiveStartDate,
        effectiveEndDate: updateElementLinkDto.effectiveEndDate
          ? updateElementLinkDto.effectiveEndDate
          : elementLink.effectiveEndDate,
        status: updateElementLinkDto.status
          ? updateElementLinkDto.status
          : 'active',
        automate: updateElementLinkDto.automate
          ? updateElementLinkDto.automate
          : elementLink.automate,
        additionalInfo: updateElementLinkDto.additionalInfo
          ? updateElementLinkDto.additionalInfo
          : elementLink.additionalInfo,
      },
    );
  }

  async findAll(id: number): Promise<Array<Elementlinks>> {
    const data = await this.elementlinksRepository.find({
      where: { elementId: id },
    });
    const allData = await Promise.all(
      data.map(async (dt) => {
        return dt;
      }),
    );
    return allData;
  }

  async getAnElementLink(elementId: number, id: number): Promise<IElementLink> {
    const element = await this.elementRepository.findOne({
      where: { id: elementId },
    });
    if (!element) {
      throw new HttpException(
        `Element with id ${elementId} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const elementLink = await this.elementlinksRepository.findOne({
      where: { id: id, elementId: elementId },
    });
    return elementLink;
  }

  async deleteElementLink(elementId: number, id: number) {
    try {
      await this.elementlinksRepository.delete({
        elementId: elementId,
        id: id,
      });
    } catch (error) {
      console.error('Error deleting element link:', error.message || error);
      throw error;
    }
  }
}
