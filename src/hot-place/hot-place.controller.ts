import { Controller, Get, Post, Body } from '@nestjs/common';
import { HotPlaceService } from './hot-place.service';
import { HotPlaceDto } from './dto/comment';

@Controller('hot-place')
export class HotPlaceController {
  constructor(private readonly hotPlaceService: HotPlaceService) { }
  @Get('all')
  async getHotPlace(
  ) {
    const hotPlace = await this.hotPlaceService.getHotPlace();
    return hotPlace;
  }

  @Post('upload')
  async createHotPlace(
    @Body() hotPlaceDto: HotPlaceDto,
  ) {
    const hotPlace = await this.hotPlaceService.createHotPlace(hotPlaceDto);
    return hotPlace;
  }
}
