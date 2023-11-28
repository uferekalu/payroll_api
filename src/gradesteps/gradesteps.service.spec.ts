import { Test, TestingModule } from '@nestjs/testing';
import { GradestepsService } from './gradesteps.service';

describe('GradestepsService', () => {
  let service: GradestepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradestepsService],
    }).compile();

    service = module.get<GradestepsService>(GradestepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
