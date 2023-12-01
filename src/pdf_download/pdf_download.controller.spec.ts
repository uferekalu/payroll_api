import { Test, TestingModule } from '@nestjs/testing';
import { PdfDownloadController } from './pdf_download.controller';

describe('PdfDownloadController', () => {
  let controller: PdfDownloadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfDownloadController],
    }).compile();

    controller = module.get<PdfDownloadController>(PdfDownloadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
