import { Test, TestingModule } from '@nestjs/testing';
import { DownloadService } from './pdf_download.service';

describe('PdfDownloadService', () => {
  let service: DownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownloadService],
    }).compile();

    service = module.get<DownloadService>(DownloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
