import { Test, TestingModule } from '@nestjs/testing';
import { LookupvaluesController } from './lookupvalues.controller';

describe('LookupvaluesController', () => {
  let controller: LookupvaluesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LookupvaluesController],
    }).compile();

    controller = module.get<LookupvaluesController>(LookupvaluesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
