import { blob } from 'stream/consumers';
import * as fs from 'fs';
import * as path from 'path';
// import { File } from 'buffer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor() {}

  getFileStream(filePath: string) {
    const stream = fs.createReadStream(filePath);
    return stream;
  }

  async getFile(filePath: string) {
    const stream = this.getFileStream(filePath);
    const blobFile = await blob(stream);
    return blobFile;
    // const fileName = filePath.split('/').pop();
    // const file = new File([blobFile], fileName);
    // return file;
  }

  async saveFile(filePath: string, data: Buffer) {
    // 創建 filePath 的目錄部分
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // filePath新增空白檔案
    fs.writeFileSync(filePath, data);
    return '/' + filePath;
  }

  async deleteFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
