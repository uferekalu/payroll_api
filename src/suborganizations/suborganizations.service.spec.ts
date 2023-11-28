import { Test, TestingModule } from '@nestjs/testing';
import { SuborganizationsService } from './suborganizations.service';

describe('SuborganizationsService', () => {
  let service: SuborganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuborganizationsService],
    }).compile();

    service = module.get<SuborganizationsService>(SuborganizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
