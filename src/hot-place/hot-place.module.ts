import { Module } from '@nestjs/common';
import { HotPlaceController } from './hot-place.controller';
import { HotPlaceService } from './hot-place.service';

@Module({
  providers: [HotPlaceService],
  controllers: [HotPlaceController],
})
export class HotPlaceModule { }
