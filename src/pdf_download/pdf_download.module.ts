import { Module } from '@nestjs/common';
import { DownloadController } from './pdf_download.controller';
import { DownloadService } from './pdf_download.service';

@Module({
  controllers: [DownloadController],
  providers: [DownloadService],
})
export class PdfDownloadModule {}
