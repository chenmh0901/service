import { Module } from '@nestjs/common';
import { QnyController } from './qny.controller';
import { QnyService } from './qny.service';

@Module({
  providers: [QnyService],
  controllers: [QnyController],
})
export class QnyModule { }
