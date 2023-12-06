import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Element } from 'src/entities/elements.entity';
import { Lookups } from 'src/entities/lookups.entity';
import { Lookupvalues } from 'src/entities/lookupvalues.entity';
import { Repository } from 'typeorm';
import { CreateElementDto } from './dto/createElementDto';
import { UpdateElementDto } from './dto/updateElementDto';

@Injectable()
export class ElementsService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    @InjectRepository(Lookups)
    private readonly lookupsRepository: Repository<Lookups>,
    @InjectRepository(Lookupvalues)
    private readonly lookupvaluesRepository: Repository<Lookupvalues>,
  ) {}

  async findOne(id: number) {
    return this.elementRepository.findOne({
      where: { id: id },
    });
  }

  async create(createElementDto: CreateElementDto) {
    // check if payrunId exists
    const payrun = await this.lookupsRepository.findOne({
      where: { name: 'Pay Run' },
    });

    const elementClassification = await this.lookupsRepository.findOne({
      where: { name: 'Element Classification' },
    });

    const elementCategory = await this.lookupsRepository.findOne({
      where: { name: 'Element Category' },
    });

    const employeeCategory = await this.lookupsRepository.findOne({
      where: { name: 'Employee Category' },
    });

    const lookupvalues = await this.lookupvaluesRepository.find();

    if (createElementDto.payRunId !== payrun.id) {
      throw new HttpException(
        'Payrun Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (createElementDto.classificationId !== elementClassification.id) {
      throw new HttpException(
        'Classification Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      createElementDto.categoryId !== elementCategory.id &&
      createElementDto.categoryId !== employeeCategory.id
    ) {
      throw new HttpException(
        'Category Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      lookupvalues.find(
        (value) => value.id === createElementDto.payRunValueId,
      ) == null
    ) {
      throw new HttpException(
        'Payrun value Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      lookupvalues.find(
        (value) => value.id === createElementDto.classificationValueId,
      ) == null
    ) {
      throw new HttpException(
        'Classification value Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      lookupvalues.find(
        (value) => value.id === createElementDto.categoryValueId,
      ) == null
    ) {
      throw new HttpException(
        'Category value Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newElement = this.elementRepository.create({
      ...createElementDto,
    });

    return await this.elementRepository.save(newElement);
  }

  async updateElement(id: number, updateElementDto: UpdateElementDto) {
    // const payrun = await this.lookupsRepository.findOne({
    //   where: { name: 'Pay Run' },
    // });

    // const elementClassification = await this.lookupsRepository.findOne({
    //   where: { name: 'Element Classification' },
    // });

    // const elementCategory = await this.lookupsRepository.findOne({
    //   where: { name: 'Element Category' },
    // });

    // const employeeCategory = await this.lookupsRepository.findOne({
    //   where: { name: 'Employee Category' },
    // });

    const lookupvalues = await this.lookupvaluesRepository.find();

    // if (updateElementDto.payRunId !== payrun.id) {
    //   throw new HttpException(
    //     'Payrun Id does not exist',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // if (updateElementDto.classificationId !== elementClassification.id) {
    //   throw new HttpException(
    //     'Classification Id does not exist',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // if (
    //   updateElementDto.categoryId !== elementCategory.id &&
    //   updateElementDto.categoryId !== employeeCategory.id
    // ) {
    //   throw new HttpException(
    //     'Category Id does not exist',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    if (
      lookupvalues.find(
        (value) => value.id === updateElementDto.payRunValueId,
      ) == null
    ) {
      throw new HttpException(
        'Payrun value Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      lookupvalues.find(
        (value) => value.id === updateElementDto.classificationValueId,
      ) == null
    ) {
      throw new HttpException(
        'Classification value Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      lookupvalues.find(
        (value) => value.id === updateElementDto.categoryValueId,
      ) == null
    ) {
      throw new HttpException(
        'Category value Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.elementRepository.update({ id }, { ...updateElementDto });
  }

  async findAll(): Promise<Array<Element>> {
    return this.elementRepository.find();
  }

  async deleteElement(id: number) {
    await this.elementRepository.delete({ id });
  }
}
