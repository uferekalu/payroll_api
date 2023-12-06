import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lookupvalues } from 'src/entities/lookupvalues.entity';
import { CreateLookupvaluesDto } from './dto/createLookupvaluesDto';
import { Lookups } from 'src/entities/lookups.entity';
import { UpdateLookupValuesDto } from './dto/updateLookupValueDto';
import { LookupValue } from './interface/lookupvalue';

@Injectable()
export class LookupvaluesService {
  constructor(
    @InjectRepository(Lookupvalues)
    private readonly lookupvaluesRepository: Repository<Lookupvalues>,
    @InjectRepository(Lookups)
    private readonly lookupsRepository: Repository<Lookups>,
  ) {}

  async findOne(id: number) {
    return this.lookupvaluesRepository.findOne({
      where: { id: id },
      relations: ['lookup'],
    });
  }

  async create(lookupId: number, createLookupvaluesDto: CreateLookupvaluesDto) {
    const lookup = await this.lookupsRepository.findOneBy({ id: lookupId });

    if (!lookup) {
      throw new HttpException(
        'Lookup not found. Cannot create Lookupvalue',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newLookupvalue = this.lookupvaluesRepository.create({
      ...createLookupvaluesDto,
      lookup,
    });

    return await this.lookupvaluesRepository.save(newLookupvalue);
  }

  async updateLookupvalue(
    id: number,
    updateLookupvalueDto: UpdateLookupValuesDto,
  ) {
    await this.lookupvaluesRepository.update(
      { id },
      { ...updateLookupvalueDto },
    );
  }

  async findAll(): Promise<Array<LookupValue>> {
    const data = await this.lookupvaluesRepository.find({
      relations: ['lookup'],
    });

    const allData = await Promise.all(
      data.map(async (dt) => {
        const { lookup, ...others } = dt;

        return {
          ...others,
          lookupId: lookup.id,
        };
      }),
    );
    return allData;
  }

  async deleteLookupvalue(id: number) {
    await this.lookupvaluesRepository.delete({ id });
  }
}
