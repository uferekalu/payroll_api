import { Test, TestingModule } from '@nestjs/testing';
import { ElementlinksService } from './elementlinks.service';

describe('ElementlinksService', () => {
  let service: ElementlinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElementlinksService],
    }).compile();

    service = module.get<ElementlinksService>(ElementlinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
