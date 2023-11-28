import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lookups } from 'src/entities/lookups.entity';
import { Repository } from 'typeorm';
import { CreatelookupsDto } from './dto/createLookupsDto';
import { Lookupvalues } from 'src/entities/lookupvalues.entity';
import { ILookupvalues } from './interface/lookupvalues';

@Injectable()
export class LookupsService {
  constructor(
    @InjectRepository(Lookups)
    private readonly lookupsRepository: Repository<Lookups>,
    @InjectRepository(Lookupvalues)
    private readonly lookupvaluesRepository: Repository<Lookupvalues>,
  ) {}

  async findOne(id: number) {
    return await this.lookupsRepository.findOne({ where: { id: id } });
  }

  async create(createLookupsDto: CreatelookupsDto) {
    const data = this.lookupsRepository.create(createLookupsDto);
    return await this.lookupsRepository.save(data);
  }

  async findAll(): Promise<Array<Lookups>> {
    return this.lookupsRepository.find();
  }

  async getLookupvalues(id: number): Promise<Array<ILookupvalues>> {
    const lookup = await this.lookupsRepository.findOneBy({ id: id });

    if (!lookup) {
      throw new HttpException(
        'Lookup not found. Cannot get lookup values',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.lookupvaluesRepository.find({
      where: { lookupName: lookup.name },
      relations: ['lookup'],
    });

    const data = Promise.all(
      result.map(async (res) => {
        const { id, name, description, status, createdAt, lookupName } = res;
        const resultData = {
          id,
          name,
          description,
          status,
          lookupId: res.lookup.id,
          lookupName,
          createdAt,
        };
        return resultData;
      }),
    );

    return data;
  }

  async getLookupvaluesById(
    lookupId: number,
    id: number,
  ): Promise<ILookupvalues> {
    const lookup = await this.lookupsRepository.findOneBy({ id: lookupId });
    const lookupValue = await this.lookupvaluesRepository.findOneBy({ id: id });

    if (!lookup) {
      throw new HttpException(
        'Lookup not found. Cannot get lookup value',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!lookupValue) {
      throw new HttpException('Lookup value not found', HttpStatus.BAD_REQUEST);
    }

    const result = await this.lookupvaluesRepository.findOne({
      where: { id: id, lookup: lookup },
      relations: ['lookup'],
    });

    if (!result) {
      throw new HttpException('Lookup value not found', HttpStatus.BAD_REQUEST);
    }

    const resultData = {
      id: result.id,
      name: result.name,
      description: result.description,
      status: result.status,
      lookupId: lookup.id,
      lookupName: result.lookupName,
      createdAt: result.createdAt,
    };

    return resultData;
  }
}
