import { Test, TestingModule } from '@nestjs/testing';
import { SuborganizationsController } from './suborganizations.controller';

describe('SuborganizationsController', () => {
  let controller: SuborganizationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuborganizationsController],
    }).compile();

    controller = module.get<SuborganizationsController>(SuborganizationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
