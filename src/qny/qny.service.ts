import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as qiniu from 'qiniu';

@Injectable()
export class QnyService {
  private accessKey: string;
  private secretKey: string;
  private bucket: string;

  constructor(private ConfigService: ConfigService) {
    this.accessKey = this.ConfigService.get(
      'QNY_ACCESS_KEY',
    );
    this.secretKey = this.ConfigService.get(
      'QNY_SECRET_KEY',
    );
    this.bucket = this.ConfigService.get('QNY_BUCKET');
  }

  async getUploadToken(
    fileType?: string
  ): Promise<string> {
    const mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
    let persistentOps = '';
    const saveKey = `${this.bucket}:$(key)`;
    const encodedSaveKey = qiniu.util.urlsafeBase64Encode(saveKey);
    const saveAs = `saveas/${encodedSaveKey}`;

    if (
      fileType === 'image/png' ||
      fileType === 'image/jpeg' ||
      fileType === 'image/webp'
    ) {
      const avifOps = 'imageMogr2/format/avif';

      persistentOps = `${avifOps}|${saveAs}`;
    } else if (fileType === 'image/gif') {
      const webpOps = 'imageMogr2/format/webp';
      persistentOps = `${webpOps}|${saveAs}`;
    }

    const options = {
      scope: this.bucket,
      persistentOps,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
  }
}
