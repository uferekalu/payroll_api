import { Test, TestingModule } from '@nestjs/testing';
import { ElementlinksController } from './elementlinks.controller';

describe('ElementlinksController', () => {
  let controller: ElementlinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElementlinksController],
    }).compile();

    controller = module.get<ElementlinksController>(ElementlinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
