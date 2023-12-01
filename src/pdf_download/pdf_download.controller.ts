import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { DownloadService } from './pdf_download.service';

@Controller()
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('download-pdf')
  async downloadPDF(@Res() res: Response) {
    const fileStream = await this.downloadService.downloadPDF();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=updated_cv.pdf');

    fileStream.pipe(res);
  }
}
