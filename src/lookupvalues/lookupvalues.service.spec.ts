import { Test, TestingModule } from '@nestjs/testing';
import { LookupvaluesService } from './lookupvalues.service';

describe('LookupvaluesService', () => {
  let service: LookupvaluesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LookupvaluesService],
    }).compile();

    service = module.get<LookupvaluesService>(LookupvaluesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
