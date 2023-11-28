import { Test, TestingModule } from '@nestjs/testing';
import { GradestepsController } from './gradesteps.controller';

describe('GradestepsController', () => {
  let controller: GradestepsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradestepsController],
    }).compile();

    controller = module.get<GradestepsController>(GradestepsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
