import { Controller, Get, Query } from '@nestjs/common';
import { QnyService } from './qny.service';

@Controller('')
export class QnyController {
  constructor(private readonly qnyService: QnyService) { }
  @Get('upload-token')
  async getUploadToken(
    @Query('fileType') fileType?: string,
  ) {
    const uploadToken = await this.qnyService.getUploadToken(
      fileType,
    );
    return { token: uploadToken };
  }
}
