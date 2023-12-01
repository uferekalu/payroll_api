import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DownloadService {
  async downloadPDF(): Promise<fs.ReadStream> {
    const filePath = path.join(process.cwd(), 'public', 'updated_cv.pdf');
    return fs.createReadStream(filePath);
  }
}
